package postgres

import "database/sql"

const (
	// ItemKindEquipment - used to distinguish physical items, e.g. furniture
	ItemKindEquipment = "equipment"
	// ItemKindLicense - used to distinguish software licenses
	ItemKindLicense = "license"
)

// ItemData - models stock item in database
type ItemData struct {
	ID          string
	Kind        string
	Category    string
	Place       string
	Price       float64
	Description string
	OwnerID     sql.NullString
	Disposed    bool
}

// OwnerData - models owner in database
type OwnerData struct {
	ID       string
	Name     string
	Email    string
	MayLogin bool
}
