package authorizing

import (
	"stocktakingbackend/security"
	"stocktakingbackend/stock"

	"github.com/pkg/errors"
)

type UserInfo struct {
	Email string
}

type OAuth2Gateway interface {
	// Returns provider-specific OAuth2 token using provider-specific authentification code.
	Authentificate(oauthCode string) (string, error)

	// Returns user info using provider-specific API and given OAuth2 token.
	GetUserInfo(token string) (*UserInfo, error)
}

type Repository interface {
	Authentificate(email, token string) error
	IsAuthentificated(token string) (bool, error)
}

type StockGateway interface {
	FindOwnerByEmail(email string) (*stock.Owner, error)
}

type Service interface {
	security.Service
	SignIn(oauthCode string) (string, error)
}

type service struct {
	oAuth2Gateway OAuth2Gateway
	stockGateway  StockGateway
	repository    Repository
}

func NewService(oAuth2Gateway OAuth2Gateway, stockGateway StockGateway, repository Repository) Service {
	s := &service{
		oAuth2Gateway: oAuth2Gateway,
		stockGateway:  stockGateway,
		repository:    repository,
	}
	return s
}

func (s *service) CheckAccess(claim security.AccessClaim, token string) (bool, error) {
	isAuthentificated, err := s.repository.IsAuthentificated(token)
	if err != nil {
		return false, err
	}
	// Anonymous user can read public data
	// Each authentificated user has admin access
	switch claim {
	default:
		return false, nil
	case security.AccessClaimReadingPublic:
		return true, nil
	case security.AccessClaimReadingPrivate:
		return isAuthentificated, nil
	case security.AccessClaimWriting:
		return isAuthentificated, nil
	}
}

func (s *service) SignIn(oauthCode string) (string, error) {
	token, err := s.oAuth2Gateway.Authentificate(oauthCode)
	if err != nil {
		return "", err
	}
	userInfo, err := s.oAuth2Gateway.GetUserInfo(token)
	if err != nil {
		return "", err
	}
	owner, err := s.stockGateway.FindOwnerByEmail(userInfo.Email)
	if err != nil {
		return "", err
	}
	if owner == nil {
		return "", errors.WithStack(security.ErrUserNotRegistered)
	}
	if !owner.MayLogin {
		return "", errors.WithStack(security.ErrUserMayNotLogin)
	}
	return token, nil
}
