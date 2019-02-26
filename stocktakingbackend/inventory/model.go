package inventory

import (
	uuid "github.com/satori/go.uuid"
)

// Model - inventory category: software, device model or furniture model
type Model struct {
	ID    uuid.UUID
	Name  string
	Price float64
	Photo *Attachment
}

func NewModel(name string, price float64, photo *Attachment) *Model {
	return &Model{
		ID:    uuid.NewV1(),
		Name:  name,
		Price: price,
		Photo: photo,
	}
}
