package inventory

import (
	uuid "github.com/satori/go.uuid"
)

// ItemStatus - current state of the item
type ItemStatus struct {
	Missed   bool
	Disposed bool
}

// Model - inventory category: software, device model or furniture model
type Model struct {
	ID    uuid.UUID
	Name  string
	Price float64
	Photo *Attachment
}

// Item - inventory item: software license, device or furniture
type Item struct {
	ID        uuid.UUID
	Model     *Model
	Marker    string
	Custodian *Custodian
	Status    ItemStatus
}

func NewModel(name string, price float64, photo *Attachment) *Model {
	return &Model{
		ID:    uuid.NewV1(),
		Name:  name,
		Price: price,
		Photo: photo,
	}
}

func NewItem(model *Model, marker string, owner *Custodian) *Item {
	return &Item{
		ID:        uuid.NewV1(),
		Model:     model,
		Marker:    marker,
		Custodian: owner,
	}
}

func (item *Item) TransferOwnership(newOwner *Custodian) {
	item.Custodian = newOwner
}

func (item *Item) Annotate() *Annotation {
	return &Annotation{
		ItemID:    item.ID,
		ModelName: item.Model.Name,
		Marker:    item.Marker,
		Custodian: item.Custodian.Name,
	}
}

func (item *Item) Dispose() {
	item.Status.Disposed = true
}
