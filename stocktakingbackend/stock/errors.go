package stock

import (
	"errors"
)

// ErrUnknownItemID - there are no item with such ID
var ErrUnknownItemID = errors.New("unknown item id")

// ErrUnknownOwnerID - there are no owner with such ID
var ErrUnknownOwnerID = errors.New("unknown owner id")

// ErrAuthForbidden - user cannot authorize this service
var ErrAuthForbidden = errors.New("authorization forbidden for this user")

// ErrEmailBusy - there is user with such email
var ErrEmailBusy = errors.New("email already busy")
