package postgres

import (
	"fmt"

	"stocktakingbackend/stock"
)

// bindAccumulator - simplifies building SQL dynamically
// PostgreSQL accepts only numbered bindings - $1, $2, $3, etc.
// This struct accumulates values and generates bindings
type bindAccumulator struct {
	values []interface{}
}

func (ba *bindAccumulator) bind(value interface{}) string {
	ba.values = append(ba.values, value)
	return fmt.Sprintf("$%d", len(ba.values))
}

func (ba *bindAccumulator) bindIDs(ids []stock.ID) []string {
	var bindings []string
	for _, id := range ids {
		bindings = append(bindings, ba.bind(id.String()))
	}
	return bindings
}
