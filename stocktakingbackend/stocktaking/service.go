package stocktaking

import (
	"sort"

	"stocktakingbackend/stock"
)

// GroupingMethod - method used to make parent nodes in item tree
type GroupingMethod int

const (
	// GroupByCategory - groups item tree by category
	GroupByCategory = GroupingMethod(iota)

	// GroupByOwner - groups item tree by owner
	GroupByOwner
)

// ItemView - brief item overview
type ItemView struct {
	ID          stock.ID
	DisplayName string
	OwnerName   string
}

// ItemGroupView - brief item group overview
type ItemGroupView struct {
	Name  string
	Items []ItemView
}

// Service - implements operations over stock
type Service interface {
	SaveItem(id stock.ID, ownerID stock.ID, spec stock.ItemSpec) (stock.ID, error)
	LoadItem(id stock.ID) (*stock.Item, error)
	LoadItems(ids []stock.ID) ([]*stock.Item, error)
	ListItems(kind stock.ItemKind, method GroupingMethod) ([]*ItemGroupView, error)
	DisposeItems(ids []stock.ID) error
	TransferItems(ids []stock.ID, ownerID stock.ID) error

	ListOwners() ([]*stock.Owner, error)
	AddOwner(spec stock.OwnerSpec) (stock.ID, error)
	SaveOwner(id stock.ID, spec stock.OwnerSpec, mayLogin bool) error
	FindOwnerByEmail(email string) (*stock.Owner, error)
	LoadOwner(id stock.ID) (*stock.Owner, error)
	DeleteOwner(id stock.ID) error
}

// FindOwnersSpec - requirements used to select owners list
type FindOwnersSpec struct {
	Limit      uint       // 0 means "no limit"
	OwnerIDs   []stock.ID // empty means "find all"
	OwnerEmail string     // empty means "find any"
}

// FindItemsSpec - requirements used to select items list
type FindItemsSpec struct {
	ShowDisposed bool
	Kind         string     // item kind to search, can be empty to find any
	Limit        uint       // 0 means "no limit"
	ItemIDs      []stock.ID // empty means "find all"
}

// Repository - represents stock as persistent collection
type Repository interface {
	FindItems(spec FindItemsSpec) ([]*stock.Item, error)
	SaveItems(items []*stock.Item) error

	FindOwners(spec FindOwnersSpec) ([]*stock.Owner, error)
	SaveOwner(owner *stock.Owner) error
	DeleteOwner(id stock.ID) error
}

type service struct {
	repo Repository
}

// NewService - creates stock management service
func NewService(repo Repository) Service {
	return &service{
		repo: repo,
	}
}

func (s *service) SaveItem(id, ownerID stock.ID, spec stock.ItemSpec) (stock.ID, error) {
	owner, err := s.findOwnerWithID(ownerID)
	if err != nil {
		return stock.NilID, err
	}
	var item *stock.Item
	if id == stock.NilID {
		item = stock.CreateItem(spec)
		item.Transfer(owner)
	} else {
		item = stock.BuildItem(id, spec, owner, false)
	}
	err = s.repo.SaveItems([]*stock.Item{item})
	if err != nil {
		return stock.NilID, err
	}
	return item.ID(), nil
}

func (s *service) LoadItem(id stock.ID) (*stock.Item, error) {
	items, err := s.repo.FindItems(FindItemsSpec{
		ShowDisposed: true,
		Limit:        1,
		ItemIDs:      []stock.ID{id},
	})
	if err != nil {
		return nil, err
	}
	if len(items) == 0 {
		return nil, stock.ErrUnknownItemID
	}
	return items[0], nil
}

func (s *service) LoadItems(ids []stock.ID) ([]*stock.Item, error) {
	items, err := s.repo.FindItems(FindItemsSpec{
		ShowDisposed: true,
		ItemIDs:      ids,
	})
	if err != nil {
		return nil, err
	}
	if len(items) != len(ids) {
		return nil, stock.ErrUnknownItemID
	}
	return items, nil
}

func (s *service) ListItems(kind stock.ItemKind, method GroupingMethod) ([]*ItemGroupView, error) {
	mapping := map[string]*ItemGroupView{}
	var views []*ItemGroupView
	items, err := s.repo.FindItems(FindItemsSpec{})
	if err != nil {
		return views, err
	}
	for _, item := range items {
		category := item.Spec().Category
		view, ok := mapping[category]
		if !ok {
			view = &ItemGroupView{
				Name: category,
			}
		}
		view.Items = insertSortItemViews(view.Items, ItemView{
			ID:          item.ID(),
			DisplayName: item.DisplayName(),
			OwnerName:   item.OwnerName(),
		})
		mapping[category] = view
	}
	// TODO: maybe sort groups and items in group?
	for _, view := range mapping {
		views = append(views, view)
	}
	sort.Slice(views, func(i, j int) bool {
		return views[i].Name < views[j].Name
	})
	return views, nil
}

func (s *service) DisposeItems(ids []stock.ID) error {
	items, err := s.findItemsWithIDs(ids)
	if err != nil {
		return err
	}
	for _, item := range items {
		item.Dispose()
	}
	return s.repo.SaveItems(items)
}

func (s *service) TransferItems(ids []stock.ID, ownerID stock.ID) error {
	owner, err := s.findOwnerWithID(ownerID)
	if err != nil {
		return err
	}
	items, err := s.findItemsWithIDs(ids)
	if err != nil {
		return err
	}
	for _, item := range items {
		item.Transfer(owner)
	}
	return s.repo.SaveItems(items)
}

func (s *service) ListOwners() ([]*stock.Owner, error) {
	return s.repo.FindOwners(FindOwnersSpec{})
}

func (s *service) AddOwner(spec stock.OwnerSpec) (stock.ID, error) {
	owners, err := s.repo.FindOwners(FindOwnersSpec{
		Limit:      1,
		OwnerEmail: spec.Email,
	})
	if err != nil {
		return stock.NilID, err
	}
	var owner *stock.Owner
	if len(owners) == 0 {
		owner = stock.CreateOwner(spec)
	} else {
		// Re-use owner, only update name
		owner = owners[0]
		owner.Name = spec.Name
	}
	err = s.repo.SaveOwner(owner)
	if err != nil {
		return stock.NilID, err
	}
	return owner.ID, nil
}

func (s *service) SaveOwner(id stock.ID, spec stock.OwnerSpec, mayLogin bool) error {
	owner := stock.BuildOwner(id, spec, mayLogin)
	return s.repo.SaveOwner(owner)
}

func (s *service) LoadOwner(id stock.ID) (*stock.Owner, error) {
	owners, err := s.repo.FindOwners(FindOwnersSpec{
		Limit:    1,
		OwnerIDs: []stock.ID{id},
	})
	if err != nil {
		return nil, err
	}
	if len(owners) == 0 {
		return nil, stock.ErrUnknownOwnerID
	}
	return owners[0], nil
}

func (s *service) DeleteOwner(id stock.ID) error {
	return s.repo.DeleteOwner(id)
}

func (s *service) FindOwnerByEmail(email string) (*stock.Owner, error) {
	owners, err := s.repo.FindOwners(FindOwnersSpec{
		Limit:      1,
		OwnerEmail: email,
	})
	if err != nil {
		return nil, err
	}
	if len(owners) == 0 {
		return nil, nil
	}
	return owners[0], nil
}

func (s *service) findItemsWithIDs(ids []stock.ID) ([]*stock.Item, error) {
	items, err := s.repo.FindItems(FindItemsSpec{
		ItemIDs: ids,
	})
	if (err == nil) && (len(items) != len(ids)) {
		// one of items missed
		err = stock.ErrUnknownItemID
	}
	return items, err
}

func (s *service) findOwnerWithID(ownerID stock.ID) (*stock.Owner, error) {
	owners, err := s.repo.FindOwners(FindOwnersSpec{
		OwnerIDs: []stock.ID{ownerID},
	})
	if err != nil {
		return nil, err
	}
	if len(owners) == 0 {
		return nil, stock.ErrUnknownOwnerID
	}
	return owners[0], err
}

func insertSortItemViews(data []ItemView, el ItemView) []ItemView {
	index := sort.Search(len(data), func(i int) bool { return data[i].DisplayName > el.DisplayName })
	data = append(data, ItemView{})
	copy(data[index+1:], data[index:])
	data[index] = el
	return data
}
