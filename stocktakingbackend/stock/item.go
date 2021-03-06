package stock

// ItemKind - e.g. "equipment" or "license"
type ItemKind string

// ItemSpec - stock item specification
type ItemSpec struct {
	Kind        ItemKind
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

const (
	// ItemKindEquipment - kind for physical equipment
	ItemKindEquipment = ItemKind("equipment")
	// ItemKindLicense kind for software licenses
	ItemKindLicense = ItemKind("license")
)

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

// ID - returns unique item ID
func (i *Item) ID() ID {
	return i.id
}

// Spec - returns ItemSpec for this item
func (i *Item) Spec() ItemSpec {
	return i.spec
}

// OwnerID - returns ID of the item owner
func (i *Item) OwnerID() ID {
	if i.owner != nil {
		return i.owner.ID
	}
	return NilID
}

// OwnerName - returns owner name
func (i *Item) OwnerName() string {
	if i.owner != nil {
		return i.owner.Name
	}
	return ""
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
