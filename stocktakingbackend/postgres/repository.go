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
			"item"."id",
			"item"."kind",
			"item"."category",
			"item"."place",
			"item"."price",
			"item"."description",
			"item"."owner_id",
			"item"."disposed",
			"owner"."name",
			"owner"."email",
			"owner"."may_login"
		FROM "item", "owner"
		WHERE "item"."owner_id" = "owner"."id"`

	var binder bindAccumulator
	if len(spec.ItemIDs) != 0 {
		bindings := binder.bindIDs(spec.ItemIDs)
		query += fmt.Sprintf(` AND "item"."id" in (%s)`, strings.Join(bindings, ","))
	}
	if spec.Kind != "" {
		binding := binder.bind(spec.Kind)
		query += fmt.Sprintf(` AND "item"."kind" = %s`, binding)
	}
	if !spec.ShowDisposed {
		query += ` AND "item"."disposed" = FALSE`
	}
	if spec.Limit != 0 {
		query += fmt.Sprintf(" LIMIT %d", spec.Limit)
	}

	var results []*stock.Item
	rows, err := sr.db.Query(query, binder.values...)
	if err != nil {
		return results, errors.Wrap(err, "sql query failed: "+query)
	}

	factory := newItemsFactory()
	for rows.Next() {
		var data ItemData
		err = rows.Scan(
			&data.ID,
			&data.Kind,
			&data.Category,
			&data.Place,
			&data.Price,
			&data.Description,
			&data.Owner.ID,
			&data.Disposed,
			&data.Owner.Name,
			&data.Owner.Email,
			&data.Owner.MayLogin,
		)
		if err != nil {
			return results, errors.Wrap(err, "failed to scan row")
		}
		item, err := factory.buildItem(data)
		if err != nil {
			return nil, err
		}
		results = append(results, item)
	}

	return results, nil
}

func (sr *stockRepository) SaveItems(items []*stock.Item) error {
	for _, item := range items {
		_, err := sr.db.Query(`
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
			item.ID().String(),
			item.Spec().Kind,
			item.Spec().Category,
			item.Spec().Place,
			item.Spec().Price,
			item.Spec().Description,
			item.OwnerID().String(),
			item.Disposed(),
		)
		if err != nil {
			return errors.Wrapf(err, "sql query failed for item %s", item.ID().String())
		}
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
	if spec.OwnerEmail != "" {
		conditions = append(conditions, `"email"=`+binder.bind(spec.OwnerEmail))
	}
	if len(conditions) > 0 {
		query += ` WHERE ` + strings.Join(conditions, ` AND `)
	}
	query += ` ORDER BY "name" DESC`
	if spec.Limit != 0 {
		query += fmt.Sprintf(" LIMIT %d", spec.Limit)
	}

	var results []*stock.Owner
	rows, err := sr.db.Query(query, binder.values...)
	if err != nil {
		return results, errors.Wrap(err, "sql query failed: "+query)
	}

	f := newItemsFactory()
	for rows.Next() {
		var data OwnerData
		err = rows.Scan(&data.ID, &data.Name, &data.Email, &data.MayLogin)
		if err != nil {
			return results, errors.Wrap(err, "failed to scan row")
		}
		owner, err := f.buildOwner(data)
		if err != nil {
			return results, err
		}
		results = append(results, owner)
	}

	return results, nil
}

func (sr *stockRepository) SaveOwner(owner *stock.Owner) error {
	_, err := sr.db.Query(`
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
		owner.ID.String(),
		owner.Name,
		owner.Email,
		owner.MayLogin,
	)
	return errors.Wrap(err, "sql query failed for owner "+owner.ID.String())
}

func (sr *stockRepository) DeleteOwner(id stock.ID) error {
	_, err := sr.db.Query(`DELETE FROM "owner" WHERE id=$1`, id.String())
	return errors.Wrap(err, "sql query failed for owner "+id.String())
}
