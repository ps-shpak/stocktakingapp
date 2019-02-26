package inventory

import uuid "github.com/satori/go.uuid"

type Owner struct {
	UserID uuid.UUID
	Name   string
}
