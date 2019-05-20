package postgres

import (
	"database/sql"
	"fmt"
	"strings"

	"github.com/pkg/errors"

	"stocktakingbackend/stock"
	"stocktakingbackend/stocktaking"
)

type stockRepository struct {
	db *sql.DB
}

// NewStockRepository - creates new repository instance
func NewStockRepository(db *sql.DB) stocktaking.Repository {
	return &stockRepository{
		db: db,
	}
}

func (sr *stockRepository) FindItems(spec stocktaking.FindItemsSpec) ([]*stock.Item, error) {
	query := `
		SELECT
			"id",
			"kind",
			"category",
			"place",
			"price",
			"description",
			"owner_id",
			"disposed"
		FROM "item"
		`
	var binder bindAccumulator
	isFirstCondition := true
	getConditionVerb := func() string {
		if isFirstCondition {
			isFirstCondition = false
			return "WHERE"
		}
		return "AND"
	}
	if len(spec.ItemIDs) != 0 {
		bindings := binder.bindIDs(spec.ItemIDs)
		query += fmt.Sprintf(` %s "id" in (%s)`, getConditionVerb(), strings.Join(bindings, ","))
	}
	if spec.Kind != "" {
		binding := binder.bind(spec.Kind)
		query += fmt.Sprintf(` %s "kind" = %s`, getConditionVerb(), binding)
	}
	if !spec.ShowDisposed {
		query += fmt.Sprintf(` %s "disposed" = FALSE`, getConditionVerb())
	}
	if spec.Limit != 0 {
		query += fmt.Sprintf(" LIMIT %d", spec.Limit)
	}
	var results []*stock.Item
	rows, err := sr.db.Query(query, binder.values...)
	if err != nil {
		return results, errors.Wrap(err, "sql query failed: "+query)
	}
	defer rows.Close()

	var dataList []ItemData
	for rows.Next() {
		var data ItemData
		err = rows.Scan(
			&data.ID,
			&data.Kind,
			&data.Category,
			&data.Place,
			&data.Price,
			&data.Description,
			&data.OwnerID,
			&data.Disposed,
		)
		if err != nil {
			return results, errors.Wrap(err, "failed to scan row")
		}
		dataList = append(dataList, data)
	}

	return sr.buildItems(dataList)
}

func (sr *stockRepository) SaveItems(items []*stock.Item) error {
	for _, item := range items {
		rows, err := sr.db.Query(`
			INSERT INTO "item"
				("id", "kind", "category", "place", "price", "description", "owner_id", "disposed")
			VALUES
				($1, $2, $3, $4, $5, $6, $7, $8)
			ON CONFLICT ("id")
			DO UPDATE SET
				"category"="excluded"."category",
				"kind"="excluded"."kind",
				"place"="excluded"."place",
				"price"="excluded"."price",
				"description"="excluded"."description",
				"owner_id"="excluded"."owner_id",
				"disposed"="excluded"."disposed"`,
			convertID(item.ID()),
			item.Spec().Kind,
			item.Spec().Category,
			item.Spec().Place,
			item.Spec().Price,
			item.Spec().Description,
			convertID(item.OwnerID()),
			item.Disposed(),
		)
		if err != nil {
			return errors.Wrapf(err, "sql query failed for item %s", item.ID().String())
		}
		rows.Close()
	}
	return nil
}

func (sr *stockRepository) FindOwners(spec stocktaking.FindOwnersSpec) ([]*stock.Owner, error) {
	query := `
		SELECT
			"id", "name", "email", "may_login"
		FROM "owner"`

	var conditions []string
	var binder bindAccumulator
	if len(spec.OwnerIDs) != 0 {
		bindings := binder.bindIDs(spec.OwnerIDs)
		conditions = append(conditions, fmt.Sprintf(`"id" in (%s)`, strings.Join(bindings, ",")))
	}
	if len(spec.OwnerEmails) != 0 {
		bindings := binder.bindStrings(spec.OwnerEmails)
		conditions = append(conditions, fmt.Sprintf(`"email" in (%s)`, strings.Join(bindings, ",")))
	}
	if len(conditions) > 0 {
		query += ` WHERE ` + strings.Join(conditions, ` AND `)
	}
	query += ` ORDER BY "name" DESC`
	if spec.Limit != 0 {
		query += fmt.Sprintf(" LIMIT %d", spec.Limit)
	}

	rows, err := sr.db.Query(query, binder.values...)
	if err != nil {
		return nil, errors.Wrap(err, "sql query failed: "+query)
	}
	defer rows.Close()

	var results []*stock.Owner
	for rows.Next() {
		var data OwnerData
		err = rows.Scan(&data.ID, &data.Name, &data.Email, &data.MayLogin)
		if err != nil {
			return nil, errors.Wrap(err, "failed to scan row")
		}
		owner, err := buildOwner(data)
		if err != nil {
			return nil, err
		}
		results = append(results, owner)
	}

	return results, nil
}

func (sr *stockRepository) SaveOwners(owners []*stock.Owner) error {
	for _, owner := range owners {
		rows, err := sr.db.Query(`
			INSERT INTO "owner"
				("id", "name", "email", "may_login")
			VALUES
				($1, $2, $3, $4)
			ON CONFLICT ("id")
			DO UPDATE SET
				"name"="excluded"."name",
				"email"="excluded"."email",
				"may_login"="excluded"."may_login"
			`,
			convertID(owner.ID),
			owner.Name,
			owner.Email,
			owner.MayLogin,
		)
		if err != nil {
			return errors.Wrap(err, "sql query failed for owner "+owner.ID.String())
		}
		rows.Close()
	}
	return nil
}

func (sr *stockRepository) DeleteOwner(id stock.ID) error {
	rows, err := sr.db.Query(`DELETE FROM "owner" WHERE id=$1`, id.String())
	if err != nil {
		return errors.Wrap(err, "sql query failed for owner "+id.String())
	}
	rows.Close()
	return nil
}

func (sr *stockRepository) buildItems(dataList []ItemData) ([]*stock.Item, error) {
	ownerIDs, err := sr.uniqueOwnerIDs(dataList)
	if err != nil {
		return nil, err
	}
	owners, err := sr.FindOwners(stocktaking.FindOwnersSpec{
		OwnerIDs: ownerIDs,
	})
	if err != nil {
		return nil, err
	}
	factory := newItemsFactory(owners)

	items := make([]*stock.Item, 0, len(dataList))
	for _, data := range dataList {
		item, err := factory.buildItem(data)
		if err != nil {
			return nil, err
		}
		items = append(items, item)
	}
	return items, nil
}

func (sr *stockRepository) uniqueOwnerIDs(dataList []ItemData) ([]stock.ID, error) {
	usedIds := map[stock.ID]bool{}
	ids := []stock.ID{}
	for _, data := range dataList {
		if !data.OwnerID.Valid {
			continue
		}
		itemID, err := stock.IDFromString(data.OwnerID.String)
		if err != nil {
			return nil, errors.Wrapf(err, "invalid item ID: %s", data.ID)
		}
		if usedIds[itemID] {
			continue
		}
		usedIds[itemID] = true
		ids = append(ids, itemID)
	}
	return ids, nil
}

func convertID(value stock.ID) sql.NullString {
	if value == stock.NilID {
		return sql.NullString{}
	}
	return sql.NullString{
		String: value.String(),
		Valid:  true,
	}
}

func buildOwner(data OwnerData) (*stock.Owner, error) {
	ownerID, err := stock.IDFromString(data.ID)
	if err != nil {
		return nil, errors.Wrapf(err, "invalid owner ID: %s", data.ID)
	}
	spec := stock.OwnerSpec{
		Name:  data.Name,
		Email: data.Email,
	}
	return stock.BuildOwner(ownerID, spec, data.MayLogin), nil
}
