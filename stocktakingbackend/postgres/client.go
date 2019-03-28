package postgres

import (
	"fmt"

	"database/sql"

	migrate "github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	bindata "github.com/golang-migrate/migrate/v4/source/go_bindata"
	"github.com/pkg/errors"

	"stocktakingbackend/postgres/data"

	// We use PostgreSQL, so we need a driver
	_ "github.com/lib/pq"

	// We read migrations from filesystem
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

// DSN - data source name components
type DSN struct {
	Host     string
	Port     uint64
	User     string
	Password string
	Database string
}

// Format - formats DSN as URL
func (c *DSN) Format() string {
	var host = c.Host
	if c.Port != 0 {
		host = fmt.Sprintf("%s:%d", host, c.Port)
	}
	return fmt.Sprintf("postgres://%s:%s@%s/%s?sslmode=disable", c.User, c.Password, host, c.Database)
}

// NewClient - creates new PostgreSQL database client
func NewClient(dsn DSN) (db *sql.DB, err error) {
	db, err = sql.Open("postgres", dsn.Format())
	if err != nil {
		return nil, errors.Wrapf(err, "failed to connect database: %s", dsn.Format())
	}
	err = applyMigrations(db)
	if err != nil {
		db.Close()
		return nil, err
	}
	return db, nil
}

func applyMigrations(db *sql.DB) error {
	dbDriver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		return errors.Wrap(err, "failed to adapt database for migrations")
	}
	assets := bindata.Resource(data.AssetNames(), data.Asset)
	assetsDriver, err := bindata.WithInstance(assets)
	if err != nil {
		return errors.Wrap(err, "failed to load migrations")
	}
	migrator, err := migrate.NewWithInstance("go-bindata", assetsDriver, "postgres", dbDriver)
	if err != nil {
		return errors.Wrap(err, "failed to start migrations")
	}
	err = migrator.Up()
	if err != migrate.ErrNoChange && err != nil {
		return errors.Wrap(err, "failed to apply migrations")
	}
	return nil
}
