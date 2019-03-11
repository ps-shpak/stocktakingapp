package stock

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

type MockRepository struct {
	foundItems     []*Item
	foundOwners    []*Owner
	lastSavedItems []*Item
	lastSavedOwner *Owner
}

func (m MockRepository) FindItems(spec FindItemsSpec) ([]*Item, error) {
	return m.foundItems, nil
}

func (m *MockRepository) SaveItems(items []*Item) error {
	m.lastSavedItems = items
	return nil
}

func (m MockRepository) FindOwners(spec FindOwnersSpec) ([]*Owner, error) {
	return m.foundOwners, nil
}

func (m *MockRepository) SaveOwner(owner *Owner) error {
	m.lastSavedOwner = owner
	return nil
}

func (m *MockRepository) reset() {
	m.foundItems = []*Item{}
	m.foundOwners = []*Owner{}
}

func (m *MockRepository) addItem(item *Item) {
	m.foundItems = append(m.foundItems, item)
}

func (m *MockRepository) addOwner(owner *Owner) {
	m.foundOwners = append(m.foundOwners, owner)
}

func TestSaveItem(t *testing.T) {
	repo := &MockRepository{}
	s := NewService(repo)
	spec := ItemSpec{
		Category:    "Table",
		Place:       "room 404",
		Price:       37,
		Description: "Just a table",
	}
	anotherSpec := ItemSpec{
		Category:    "Monitor",
		Place:       "no room",
		Price:       20,
		Description: "just a monitor",
	}
	item := CreateItem(spec)
	owner := CreateOwner(OwnerSpec{
		Email: "anyone@example.com",
		Name:  "Any One",
	})

	// should fail when owner doesn't exist
	repo.reset()
	{
		repo.addItem(item)
		id, err := s.SaveItem(item.ID(), GenerateID(), spec)
		assert.Equal(t, NilID, id)
		assert.Error(t, err)
	}

	// should succeed when owner exists, but item does not
	repo.reset()
	{
		repo.addOwner(owner)
		id, err := s.SaveItem(NilID, owner.ID, spec)
		assert.NoError(t, err)
		assert.NotEqual(t, NilID, id)
		assert.Equal(t, 1, len(repo.lastSavedItems))
		lastSavedItem := repo.lastSavedItems[0]
		assert.Equal(t, lastSavedItem.ID(), id)
		assert.Equal(t, lastSavedItem.Spec(), spec)
		assert.Equal(t, lastSavedItem.Disposed(), false)
	}

	// should succeed when owner and item already exist
	repo.reset()
	{
		repo.addOwner(owner)
		repo.addItem(item)
		id, err := s.SaveItem(item.ID(), owner.ID, anotherSpec)
		assert.NoError(t, err)
		assert.Equal(t, item.ID(), id)
		assert.Equal(t, 1, len(repo.lastSavedItems))
		lastSavedItem := repo.lastSavedItems[0]
		assert.Equal(t, lastSavedItem.ID(), item.ID())
		assert.Equal(t, lastSavedItem.Spec(), anotherSpec)
		assert.Equal(t, lastSavedItem.Disposed(), item.Disposed())
	}
}
