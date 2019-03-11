package stock

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
	ID          ID
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
	SaveItem(id ID, ownerID ID, spec ItemSpec) (ID, error)
	LoadItem(id ID) (*Item, error)
	ListItems(method GroupingMethod) ([]ItemGroupView, error)
	DisposeItems(ids []ID) error
	TransferItems(ids []ID, ownerID ID) error

	ListOwners() ([]Owner, error)
	AddOwner(spec OwnerSpec) (ID, error)
	SaveOwner(id ID, spec OwnerSpec, mayLogin bool) error
	Authorize(email string) (ID, error)
}

// FindOwnersSpec - requirements used to select owners list
type FindOwnersSpec struct {
	Limit      uint   // 0 means "no limit"
	OwnerIDs   []ID   // empty means "find all"
	OwnerEmail string // empty means "find any"
}

// FindItemsSpec - requirements used to select items list
type FindItemsSpec struct {
	Limit   uint // 0 means "no limit"
	ItemIDs []ID // empty means "find all"
}

// Repository - represents stock as persistent collection
type Repository interface {
	FindItems(spec FindItemsSpec) ([]*Item, error)
	SaveItems(items []*Item) error

	FindOwners(spec FindOwnersSpec) ([]*Owner, error)
	SaveOwner(owner *Owner) error
}

type service struct {
	repo Repository
}

func (s *service) SaveItem(id ID, ownerID ID, spec ItemSpec) (ID, error) {
	owner, err := s.findOwnerWithID(ownerID)
	if err != nil {
		return NilID, err
	}
	var item *Item
	if id == NilID {
		item = CreateItem(spec)
		item.Transfer(owner)
	} else {
		item = BuildItem(id, spec, owner, false)
	}
	err = s.repo.SaveItems([]*Item{item})
	if err != nil {
		return NilID, err
	}
	return item.ID(), nil
}

func (s *service) LoadItem(id ID) (*Item, error) {
	items, err := s.repo.FindItems(FindItemsSpec{
		Limit:   1,
		ItemIDs: []ID{id},
	})
	if err != nil {
		return nil, err
	}
	if len(items) == 0 {
		return nil, ErrUnknownID
	}
	return items[0], nil
}

func (s *service) ListItems(method GroupingMethod) ([]ItemGroupView, error) {
	mapping := map[string]*ItemGroupView{}
	var views []ItemGroupView
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
		view.Items = append(view.Items, ItemView{
			ID:          item.ID(),
			DisplayName: item.DisplayName(),
			OwnerName:   item.OwnerName(),
		})
		mapping[category] = view
	}
	for _, view := range mapping {
		views = append(views, *view)
	}
	return views, nil
}

func (s *service) DisposeItems(ids []ID) error {
	items, err := s.findItemsWithIDs(ids)
	if err != nil {
		return err
	}
	for _, item := range items {
		item.Dispose()
	}
	return s.repo.SaveItems(items)
}

func (s *service) TransferItems(ids []ID, ownerID ID) error {
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

func (s *service) ListOwners() ([]Owner, error) {
	// TODO: implement me
}

func (s *service) AddOwner(spec OwnerSpec) (ID, error) {
	// TODO: implement me
}

func (s *service) SaveOwner(id ID, spec OwnerSpec, mayLogin bool) error {
	// TODO: implement me
}

func (s *service) Authorize(email string) (ID, error) {
	// TODO: implement me
}

func (s *service) findItemsWithIDs(ids []ID) ([]*Item, error) {
	items, err := s.repo.FindItems(FindItemsSpec{
		ItemIDs: ids,
	})
	if (err == nil) && (len(items) != len(ids)) {
		// one of items missed
		err = ErrUnknownID
	}
	return items, err
}

func (s *service) findOwnerWithID(ownerID ID) (*Owner, error) {
	owners, err := s.repo.FindOwners(FindOwnersSpec{
		OwnerIDs: []ID{ownerID},
	})
	if err == nil && len(owners) == 0 {
		err = ErrUnknownID
	}
	return owners[0], err
}
