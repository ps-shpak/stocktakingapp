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

// Repository - represents stock as persistent collection
type Repository interface {
	FindOwner(ownerID ID) (*Owner, error)
	LoadItems(ids []ID) ([]*Item, error)
	SaveItems(ids []ID) ([]*Item, error)
}

type service struct {
	repo *Repository
}
