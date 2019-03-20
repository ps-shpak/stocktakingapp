package postgres

import (
	"stocktakingbackend/stock"
	"strings"

	"github.com/jinzhu/gorm"
	"github.com/pkg/errors"
)

type stockRepository struct {
	db *gorm.DB
}

// NewStockRepository - creates new repository instance
func NewStockRepository(db *gorm.DB) stock.Repository {
	return &stockRepository{
		db: db,
	}
}

func (sr *stockRepository) FindItems(spec stock.FindItemsSpec) ([]*stock.Item, error) {
	var results []*stock.Item
	items, err := sr.findItems(spec)
	if err != nil {
		return results, err
	}
	ids, err := sr.getItemIds(items)
	if err != nil {
		return results, err
	}
	owners, err := sr.FindOwners(stock.FindOwnersSpec{
		OwnerIDs: ids,
	})
	if err != nil {
		return results, err
	}
	ownerMapping := map[string]*stock.Owner{}
	for _, owner := range owners {
		ownerMapping[owner.ID.String()] = owner
	}

	for _, item := range items {
		id, err := stock.IDFromString(item.ID)
		if err != nil {
			return results, errors.Errorf("invalid ID: %s", item.ID)
		}
		spec := stock.ItemSpec{
			Category:    item.Category,
			Description: item.Description,
			Place:       item.Place,
			Price:       item.Price,
		}
		owner := ownerMapping[item.OwnerID]
		disposed := (item.DeletedAt != nil)
		results = append(results, stock.BuildItem(id, spec, owner, disposed))
	}

	return results, nil
}

func (sr *stockRepository) SaveItems(items []*stock.Item) error {
	queryErrors := sr.db.Save(items).GetErrors()
	return mergeErrors(queryErrors)
}

func (sr *stockRepository) FindOwners(spec stock.FindOwnersSpec) ([]*stock.Owner, error) {
	var results []*stock.Owner

	owners, err := sr.findOwners(spec)
	if err != nil {
		return results, err
	}

	for _, owner := range owners {
		id, err := stock.IDFromString(owner.ID)
		if err != nil {
			return results, errors.Errorf("invalid ID: %s", owner.ID)
		}
		spec := stock.OwnerSpec{
			Name:  owner.Name,
			Email: owner.Email,
		}
		results = append(results, stock.BuildOwner(id, spec, owner.MayLogin))
	}

	return results, nil
}

func (sr *stockRepository) SaveOwner(owner *stock.Owner) error {
	queryErrors := sr.db.Save(owner).GetErrors()
	return mergeErrors(queryErrors)
}

func (sr *stockRepository) findItems(spec stock.FindItemsSpec) ([]Item, error) {
	var ids []string
	for _, id := range spec.ItemIDs {
		ids = append(ids, id.String())
	}

	var items []Item
	query := sr.db
	if spec.Limit != 0 {
		query = query.Limit(spec.Limit)
	}
	if len(ids) != 0 {
		query = query.Where("id in (?)", ids)
	}
	queryErrors := query.Find(&items).GetErrors()
	return items, mergeErrors(queryErrors)
}

func (sr *stockRepository) findOwners(spec stock.FindOwnersSpec) ([]Owner, error) {
	var ids []string
	for _, id := range spec.OwnerIDs {
		ids = append(ids, id.String())
	}

	var owners []Owner
	query := sr.db
	if spec.Limit != 0 {
		query = query.Limit(spec.Limit)
	}
	if len(ids) != 0 {
		query = query.Where("id in (?)", ids)
	}
	if len(spec.OwnerEmail) != 0 {
		query = query.Where("email=?", spec.OwnerEmail)
	}
	query = query.Order("name DESC")
	queryErrors := query.Find(&owners).GetErrors()
	return owners, mergeErrors(queryErrors)
}

func (sr *stockRepository) getItemIds(items []Item) ([]stock.ID, error) {
	var ids []stock.ID
	for _, item := range items {
		id, err := stock.IDFromString(item.ID)
		if err != nil {
			return []stock.ID{}, errors.Errorf("invalid ID: %s", item.ID)
		}
		ids = append(ids, id)
	}
	return ids, nil
}

func mergeErrors(errs []error) error {
	if len(errs) == 0 {
		return nil
	}
	var reasons []string
	for _, err := range errs {
		reasons = append(reasons, err.Error())
	}
	return errors.New("database failure: " + strings.Join(reasons, ", "))
}
