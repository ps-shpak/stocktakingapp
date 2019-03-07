package stock

import (
	uuid "github.com/satori/go.uuid"
)

// ItemSpec - inventory item specification
type ItemSpec struct {
	Owner       *Owner
	Category    string
	Place       string
	Price       float64
	Description string
}

// Item - inventory item: software license or property
type Item struct {
	ID       uuid.UUID
	Spec     ItemSpec
	Disposed bool
}

// CreateItem - creates new item with unique ID
func CreateItem(spec ItemSpec) *Item {
	return &Item{
		ID:       uuid.NewV1(),
		Spec:     spec,
		Disposed: false,
	}
}

// Transfer - re-assigns item owner
func (i *Item) Transfer(owner *Owner) {
	i.Spec.Owner = owner
}

// Format - prints display name of the item
func (i *Item) Format() string {
	var result string
	result = i.Spec.Category
	if len(i.Spec.Place) > 0 {
		result += " "
		result += i.Spec.Place
	}
	return result
}

// Dispose - disposes inventory item
func (i *Item) Dispose() {
	i.Disposed = true
	i.Spec.Owner = nil
}
