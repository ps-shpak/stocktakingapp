package postgres

// ItemData - models stock item in database
type ItemData struct {
	ID          string
	Category    string
	Place       string
	Price       float64
	Description string
	Disposed    bool
	Owner       OwnerData
}

// OwnerData - models owner in database
type OwnerData struct {
	ID       string
	Name     string
	Email    string
	MayLogin bool
}
