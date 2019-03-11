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

// CreateOwner - creates new ownertem with unique ID
func CreateOwner(spec OwnerSpec) *Owner {
	return &Owner{
		ID:       GenerateID(),
		Name:     spec.Name,
		Email:    spec.Email,
		MayLogin: false,
	}
}

// BuildOwner - builds owner with known values
func BuildOwner(id ID, spec OwnerSpec, mayLogin bool) *Owner {
	return &Owner{
		ID:       id,
		Name:     spec.Name,
		Email:    spec.Email,
		MayLogin: mayLogin,
	}
}
