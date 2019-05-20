package postgres

import (
	"stocktakingbackend/stock"

	"github.com/pkg/errors"
)

type itemsFactory struct {
	owners map[string]*stock.Owner
}

func newItemsFactory(owners []*stock.Owner) *itemsFactory {
	f := &itemsFactory{
		owners: make(map[string]*stock.Owner, len(owners)),
	}
	for _, owner := range owners {
		f.owners[owner.ID.String()] = owner
	}
	return f
}

func (f *itemsFactory) buildItem(data ItemData) (*stock.Item, error) {
	var owner *stock.Owner
	if data.OwnerID.Valid {
		owner = f.owners[data.OwnerID.String]
	}

	itemID, err := stock.IDFromString(data.ID)
	if err != nil {
		return nil, errors.Wrapf(err, "invalid item ID: %s", data.ID)
	}
	var kind stock.ItemKind
	switch data.Kind {
	case ItemKindEquipment:
		kind = stock.ItemKindEquipment
	case ItemKindLicense:
		kind = stock.ItemKindLicense
	}
	spec := stock.ItemSpec{
		Kind:        kind,
		Category:    data.Category,
		Place:       data.Place,
		Price:       data.Price,
		Description: data.Description,
	}

	return stock.BuildItem(itemID, spec, owner, data.Disposed), nil
}
