package postgres

import (
	"time"
)

type Model struct {
	ID        string `sql:"type:uuid;primary_key"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt *time.Time `sql:"index"`
}

type Item struct {
	Model
	Category    string
	Place       string
	Price       float64
	Description string
	OwnerID     string
}

type Owner struct {
	Model
	Name     string
	Email    string
	MayLogin bool
}
