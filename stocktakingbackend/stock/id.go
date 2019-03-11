package stock

import (
	uuid "github.com/satori/go.uuid"
)

// ID - unique object ID
type ID uuid.UUID

// NilID - special ID which contains zero values for each bit
var NilID = ID{}

// GenerateID - generates ID using UUID v1 (which contains timestamp)
func GenerateID() ID {
	return ID(uuid.NewV1())
}

// IDFromString - parses ID from string
func IDFromString(input string) (ID, error) {
	id, err := uuid.FromString(input)
	return ID(id), err
}

func (id ID) String() string {
	return uuid.UUID(id).String()
}
