package stock

// OwnerSpec - owner specification
type OwnerSpec struct {
	Name  string
	Email string
}

// Owner - anyone who can own item
type Owner struct {
	ID       ID
	Name     string
	Email    string
	MayLogin bool
}

// CreateOwner - creates new item with unique ID
func CreateOwner(spec OwnerSpec) *Owner {
	return &Owner{
		ID:       GenerateID(),
		Name:     spec.Name,
		Email:    spec.Email,
		MayLogin: false,
	}
}
