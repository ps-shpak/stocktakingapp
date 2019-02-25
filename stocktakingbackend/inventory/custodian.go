package inventory

import uuid "github.com/satori/go.uuid"

type Custodian struct {
	UserID uuid.UUID
	Name   string
}
