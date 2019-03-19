package postgres

import (
	"fmt"
	"strings"

	"github.com/jinzhu/gorm"
	"github.com/pkg/errors"

	// We use PostgreSQL, so we need driver
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// DSN - data source name components
type DSN struct {
	Host     string
	Port     uint64
	User     string
	Password string
	Database string
}

func (c *DSN) String() string {
	var params []string
	if len(c.Host) != 0 {
		params = append(params, fmt.Sprintf("host=%s", c.Host))
	}
	if c.Port != 0 {
		params = append(params, fmt.Sprintf("port=%d", c.Port))
	}
	if len(c.User) != 0 {
		params = append(params, fmt.Sprintf("user=%s", c.User))
	}
	if len(c.Database) != 0 {
		params = append(params, fmt.Sprintf("dbname=%s", c.Database))
	}
	if len(c.Password) != 0 {
		params = append(params, fmt.Sprintf("password=%s", c.Password))
	}

	// Do not use ssl connection with database (otherwise SSL must be enabled in PostgreSQL).
	params = append(params, "sslmode=disable")

	return strings.Join(params, " ")
}

// NewClient - creates new PostgreSQL database client
func NewClient(dsn DSN) (db *gorm.DB, err error) {
	db, err = gorm.Open("postgres", dsn.String())
	if err != nil {
		return nil, err
	}

	defer func() {
		if err != nil {
			db.Close()
		}
	}()

	db.AutoMigrate(&Owner{}, &Item{})
	if db.Error != nil {
		err = db.Error
		return nil, errors.Wrap(err, "failed to apply migrations")
	}

	return db, nil
}
