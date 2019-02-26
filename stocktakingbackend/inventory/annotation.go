package inventory

import (
	uuid "github.com/satori/go.uuid"
)

// Annotation - item description stored in label
type Annotation struct {
	ItemID    uuid.UUID
	ModelName string
	Marker    string
	Owner string
}
