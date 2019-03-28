package postgres

import (
	"stocktakingbackend/stock"

	"github.com/pkg/errors"
)

type itemsFactory struct {
	owners map[string]*stock.Owner
}

func newItemsFactory() *itemsFactory {
	return &itemsFactory{
		owners: make(map[string]*stock.Owner),
	}
}

func (f *itemsFactory) buildItem(data ItemData) (*stock.Item, error) {
	owner, err := f.cacheOwner(data.Owner)
	if err != nil {
		return nil, err
	}

	itemID, err := stock.IDFromString(data.ID)
	if err != nil {
		return nil, errors.Wrapf(err, "invalid item ID: %s", data.ID)
	}
	spec := stock.ItemSpec{
		Category:    data.Category,
		Place:       data.Place,
		Price:       data.Price,
		Description: data.Description,
	}

	return stock.BuildItem(itemID, spec, owner, data.Disposed), nil
}

func (f *itemsFactory) cacheOwner(data OwnerData) (*stock.Owner, error) {
	owner, ok := f.owners[data.ID]
	if !ok {
		var err error
		owner, err = f.buildOwner(data)
		if err != nil {
			return nil, err
		}
		f.owners[data.ID] = owner
	}
	return owner, nil
}

func (f *itemsFactory) buildOwner(data OwnerData) (*stock.Owner, error) {
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
