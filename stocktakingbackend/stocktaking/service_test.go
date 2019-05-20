package stocktaking

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"stocktakingbackend/stock"
)

type MockRepository struct {
	foundItems      []*stock.Item
	foundOwners     []*stock.Owner
	lastSavedItems  []*stock.Item
	lastSavedOwners []*stock.Owner
}

func (m MockRepository) FindItems(spec FindItemsSpec) ([]*stock.Item, error) {
	return m.foundItems, nil
}

func (m *MockRepository) SaveItems(items []*stock.Item) error {
	m.lastSavedItems = items
	return nil
}

func (m MockRepository) FindOwners(spec FindOwnersSpec) ([]*stock.Owner, error) {
	return m.foundOwners, nil
}

func (m *MockRepository) SaveOwners(owners []*stock.Owner) error {
	m.lastSavedOwners = owners
	return nil
}

func (m *MockRepository) DeleteOwner(id stock.ID) error {
	return nil
}

func (m *MockRepository) reset() {
	m.foundItems = []*stock.Item{}
	m.foundOwners = []*stock.Owner{}
}

func (m *MockRepository) addItem(item *stock.Item) {
	m.foundItems = append(m.foundItems, item)
}

func (m *MockRepository) addOwner(owner *stock.Owner) {
	m.foundOwners = append(m.foundOwners, owner)
}

func TestSaveItem(t *testing.T) {
	repo := &MockRepository{}
	s := NewService(repo)
	spec := stock.ItemSpec{
		Category:    "Table",
		Place:       "room 404",
		Price:       37,
		Description: "Just a table",
	}
	anotherSpec := stock.ItemSpec{
		Category:    "Monitor",
		Place:       "no room",
		Price:       20,
		Description: "just a monitor",
	}
	item := stock.CreateItem(spec)
	owner := stock.CreateOwner(stock.OwnerSpec{
		Email: "anyone@example.com",
		Name:  "Any One",
	})

	// should fail when owner doesn't exist
	repo.reset()
	{
		repo.addItem(item)
		id, err := s.SaveItem(item.ID(), stock.GenerateID(), spec)
		assert.Equal(t, stock.NilID, id)
		assert.Error(t, err)
	}

	// should succeed when owner exists, but item does not
	repo.reset()
	{
		repo.addOwner(owner)
		id, err := s.SaveItem(stock.NilID, owner.ID, spec)
		assert.NoError(t, err)
		assert.NotEqual(t, stock.NilID, id)
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
