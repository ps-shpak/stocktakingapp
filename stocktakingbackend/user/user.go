package inventory

import (
	uuid "github.com/satori/go.uuid"
)

// User - person which can own items for a while
type User struct {
	ID       uuid.UUID
	Login    string
	Domain   string
	FullName string
}
