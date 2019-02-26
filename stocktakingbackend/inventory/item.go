package inventory

import (
	uuid "github.com/satori/go.uuid"
)

// ItemStatus - current state of the item
type ItemStatus struct {
	Missed   bool
	Disposed bool
}

// Item - inventory item: software license, device or furniture
type Item struct {
	ID     uuid.UUID
	Model  *Model
	Marker string
	Owner  *Owner
	Status ItemStatus
}

func NewItem(model *Model, marker string, owner *Owner) *Item {
	return &Item{
		ID:     uuid.NewV1(),
		Model:  model,
		Marker: marker,
		Owner:  owner,
	}
}

func (item *Item) TransferOwnership(newOwner *Owner) {
	item.Owner = newOwner
}

func (item *Item) Annotate() *Annotation {
	return &Annotation{
		ItemID:    item.ID,
		ModelName: item.Model.Name,
		Marker:    item.Marker,
		Owner:     item.Owner.Name,
	}
}

func (item *Item) Dispose() {
	item.Status.Disposed = true
}
