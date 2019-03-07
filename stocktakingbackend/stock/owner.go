package stock

import (
	uuid "github.com/satori/go.uuid"
)

// Owner - anyone who can own item
type Owner struct {
	ID       uuid.UUID
	Name     string
	Email    string
	MayLogin bool
}

// CreateOwner - creates new item with unique ID
func CreateOwner(name string, email string) *Owner {
	return &Owner{
		ID:       uuid.NewV1(),
		Name:     name,
		Email:    email,
		MayLogin: false,
	}
}
