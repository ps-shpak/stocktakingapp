package security

import "errors"

type AccessClaim int

const (
	AccessClaimReadingPublic = AccessClaim(iota)
	AccessClaimReadingPrivate
	AccessClaimWriting
)

var (
	ErrUserNotRegistered = errors.New("user is not registered")
	ErrUserMayNotLogin   = errors.New("user login forbidden")
)

type Gateway interface {
	CheckAccess(claim AccessClaim, token string) (bool, error)
}
