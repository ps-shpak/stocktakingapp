package stock

import "errors"

// ErrUnknownID - there are no object with such ID
var ErrUnknownID = errors.New("unknown id")

// ErrAuthForbidden - user cannot authorize this service
var ErrAuthForbidden = errors.New("authorization forbidden for this user")
