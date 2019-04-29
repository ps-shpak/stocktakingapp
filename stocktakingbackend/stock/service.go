package stock

import (
	"encoding/json"
	"image"
	"sort"

	"github.com/pkg/errors"
	"github.com/skip2/go-qrcode"
)

// GroupingMethod - method used to make parent nodes in item tree
type GroupingMethod int

const (
	// GroupByCategory - groups item tree by category
	GroupByCategory = GroupingMethod(iota)

	// GroupByOwner - groups item tree by owner
	GroupByOwner
)

// ItemKind - e.g. "equipment" or "license"
type ItemKind string

const (
	// ItemKindEquipment - kind for physical equipment
	ItemKindEquipment = ItemKind("equipment")
	// ItemKindLicense kind for software licenses
	ItemKindLicense = ItemKind("license")
)

// ItemView - brief item overview
type ItemView struct {
	ID          ID
	DisplayName string
	OwnerName   string
}

// ItemGroupView - brief item group overview
type ItemGroupView struct {
	Name  string
	Items []ItemView
}

// Service - implements operations over stock
type Service interface {
	SaveItem(id ID, ownerID ID, spec ItemSpec) (ID, error)
	LoadItem(id ID) (*Item, error)
	ListItems(kind ItemKind, method GroupingMethod) ([]*ItemGroupView, error)
	DisposeItems(ids []ID) error
	TransferItems(ids []ID, ownerID ID) error
	GetItemAnnotationQR(id ID, imageSize int) (image.Image, error)

	ListOwners() ([]*Owner, error)
	AddOwner(spec OwnerSpec) (ID, error)
	SaveOwner(id ID, spec OwnerSpec, mayLogin bool) error
	Authorize(email string) (ID, error)
}

// FindOwnersSpec - requirements used to select owners list
type FindOwnersSpec struct {
	Limit      uint   // 0 means "no limit"
	OwnerIDs   []ID   // empty means "find all"
	OwnerEmail string // empty means "find any"
}

// FindItemsSpec - requirements used to select items list
type FindItemsSpec struct {
	ShowDisposed bool
	Kind         string // item kind to search, can be empty to find any
	Limit        uint   // 0 means "no limit"
	ItemIDs      []ID   // empty means "find all"
}

// Repository - represents stock as persistent collection
type Repository interface {
	FindItems(spec FindItemsSpec) ([]*Item, error)
	SaveItems(items []*Item) error

	FindOwners(spec FindOwnersSpec) ([]*Owner, error)
	SaveOwner(owner *Owner) error
}

type service struct {
	repo Repository
}

// NewService - creates stock management service
func NewService(repo Repository) Service {
	return &service{
		repo: repo,
	}
}

func (s *service) SaveItem(id, ownerID ID, spec ItemSpec) (ID, error) {
	owner, err := s.findOwnerWithID(ownerID)
	if err != nil {
		return NilID, err
	}
	var item *Item
	if id == NilID {
		item = CreateItem(spec)
		item.Transfer(owner)
	} else {
		item = BuildItem(id, spec, owner, false)
	}
	err = s.repo.SaveItems([]*Item{item})
	if err != nil {
		return NilID, err
	}
	return item.ID(), nil
}

func (s *service) LoadItem(id ID) (*Item, error) {
	items, err := s.repo.FindItems(FindItemsSpec{
		ShowDisposed: true,
		Limit:        1,
		ItemIDs:      []ID{id},
	})
	if err != nil {
		return nil, err
	}
	if len(items) == 0 {
		return nil, ErrUnknownItemID
	}
	return items[0], nil
}

func (s *service) ListItems(kind ItemKind, method GroupingMethod) ([]*ItemGroupView, error) {
	mapping := map[string]*ItemGroupView{}
	var views []*ItemGroupView
	items, err := s.repo.FindItems(FindItemsSpec{})
	if err != nil {
		return views, err
	}
	for _, item := range items {
		category := item.Spec().Category
		view, ok := mapping[category]
		if !ok {
			view = &ItemGroupView{
				Name: category,
			}
		}
		view.Items = insertSortItemViews(view.Items, ItemView{
			ID:          item.ID(),
			DisplayName: item.DisplayName(),
			OwnerName:   item.OwnerName(),
		})
		mapping[category] = view
	}
	// TODO: maybe sort groups and items in group?
	for _, view := range mapping {
		views = append(views, view)
	}
	sort.Slice(views, func(i, j int) bool {
		return views[i].Name < views[j].Name
	})
	return views, nil
}

func (s *service) DisposeItems(ids []ID) error {
	items, err := s.findItemsWithIDs(ids)
	if err != nil {
		return err
	}
	for _, item := range items {
		item.Dispose()
	}
	return s.repo.SaveItems(items)
}

func (s *service) TransferItems(ids []ID, ownerID ID) error {
	owner, err := s.findOwnerWithID(ownerID)
	if err != nil {
		return err
	}
	items, err := s.findItemsWithIDs(ids)
	if err != nil {
		return err
	}
	for _, item := range items {
		item.Transfer(owner)
	}
	return s.repo.SaveItems(items)
}

func (s *service) GetItemAnnotationQR(id ID, imageSize int) (image.Image, error) {
	item, err := s.LoadItem(id)
	if err != nil {
		return nil, err
	}
	img, err := s.encodeAnnotationToQR(item.Annotation(), imageSize)
	if err != nil {
		return nil, err
	}
	return img, nil
}

func (s *service) ListOwners() ([]*Owner, error) {
	return s.repo.FindOwners(FindOwnersSpec{})
}

func (s *service) AddOwner(spec OwnerSpec) (ID, error) {
	owners, err := s.repo.FindOwners(FindOwnersSpec{
		Limit:      1,
		OwnerEmail: spec.Email,
	})
	if err != nil {
		return NilID, err
	}
	var owner *Owner
	if len(owners) == 0 {
		owner = CreateOwner(spec)
	} else {
		// Re-use owner, only update name
		owner = owners[0]
		owner.Name = spec.Name
	}
	err = s.repo.SaveOwner(owner)
	if err != nil {
		return NilID, err
	}
	return owner.ID, nil
}

func (s *service) SaveOwner(id ID, spec OwnerSpec, mayLogin bool) error {
	owner := BuildOwner(id, spec, mayLogin)
	return s.repo.SaveOwner(owner)
}

func (s *service) Authorize(email string) (ID, error) {
	owners, err := s.repo.FindOwners(FindOwnersSpec{
		Limit:      1,
		OwnerEmail: email,
	})
	if err != nil {
		return NilID, err
	}
	if len(owners) == 0 {
		return NilID, ErrUnknownOwnerID
	}
	owner := owners[0]
	if !owner.MayLogin {
		return NilID, ErrAuthForbidden
	}
	return owner.ID, nil
}

func (s *service) findItemsWithIDs(ids []ID) ([]*Item, error) {
	items, err := s.repo.FindItems(FindItemsSpec{
		ItemIDs: ids,
	})
	if (err == nil) && (len(items) != len(ids)) {
		// one of items missed
		err = ErrUnknownItemID
	}
	return items, err
}

func (s *service) findOwnerWithID(ownerID ID) (*Owner, error) {
	owners, err := s.repo.FindOwners(FindOwnersSpec{
		OwnerIDs: []ID{ownerID},
	})
	if err != nil {
		return nil, err
	}
	if len(owners) == 0 {
		return nil, ErrUnknownOwnerID
	}
	return owners[0], err
}

func (s *service) encodeAnnotationToQR(ann Annotation, imageSize int) (image.Image, error) {
	// Encode JSON with all sensitive data
	fullData := map[string]interface{}{
		"id":       ann.ID,
		"name":     ann.Name,
		"owner":    ann.OwnerName,
		"owner_id": ann.OwnerID,
	}
	img, err := s.encodeMapToQR(fullData, imageSize)
	if err != nil {
		// Maybe too much data (QR code has limited capacity),
		//  so try again with minimal data and predictable size
		minimalData := map[string]interface{}{
			"id": ann.ID,
		}
		img, err = s.encodeMapToQR(minimalData, imageSize)
		if err != nil {
			return nil, err
		}
	}
	return img, nil
}

func (s *service) encodeMapToQR(data map[string]interface{}, imageSize int) (image.Image, error) {
	bytes, err := json.Marshal(data)
	if err != nil {
		return nil, errors.Wrap(err, "failed to marshal JSON")
	}

	// Use high recovery level to make scanning more reliable
	code, err := qrcode.New(string(bytes), qrcode.High)
	if err != nil {
		return nil, errors.Wrap(err, "failed to generate QR code")
	}

	return code.Image(imageSize), nil
}

func insertSortItemViews(data []ItemView, el ItemView) []ItemView {
	index := sort.Search(len(data), func(i int) bool { return data[i].DisplayName > el.DisplayName })
	data = append(data, ItemView{})
	copy(data[index+1:], data[index:])
	data[index] = el
	return data
}
