package stock

// ItemSpec - stock item specification
type ItemSpec struct {
	Category    string
	Place       string
	Price       float64
	Description string
}

// Item - stock item: software license or material object
type Item struct {
	id       ID
	spec     ItemSpec
	owner    *Owner
	disposed bool
}

// CreateItem - creates item with unique ID
func CreateItem(spec ItemSpec) *Item {
	return &Item{
		id:       GenerateID(),
		spec:     spec,
		disposed: false,
	}
}

// BuildItem - creates item with given properties
func BuildItem(id ID, spec ItemSpec, owner *Owner, disposed bool) *Item {
	return &Item{
		id:       id,
		spec:     spec,
		owner:    owner,
		disposed: disposed,
	}
}

// Transfer - re-assigns item owner
func (i *Item) Transfer(owner *Owner) {
	i.owner = owner
}

// Dispose - disposes inventory item
func (i *Item) Dispose() {
	i.disposed = true
	i.owner = nil
}

func (i *Item) ID() ID {
	return i.id
}

// Spec - returns ItemSpec for this item
func (i *Item) Spec() ItemSpec {
	return i.spec
}

// OwnerID - returns ID of the item owner
func (i *Item) OwnerID() ID {
	return i.owner.ID
}

// OwnerName - returns
func (i *Item) OwnerName() string {
	return i.owner.Name
}

// DisplayName - prints display name of the item
func (i *Item) DisplayName() string {
	result := i.spec.Category
	if len(i.spec.Place) > 0 {
		result += ", "
		result += i.spec.Place
	}
	return result
}

// Disposed - returns true if item disposed (deleted from stock)
func (i *Item) Disposed() bool {
	return i.disposed
}
