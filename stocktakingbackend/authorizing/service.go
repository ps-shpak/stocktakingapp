package authorizing

import (
	"stocktakingbackend/security"
	"stocktakingbackend/stock"

	"github.com/pkg/errors"
)

type UserInfo struct {
	AccountEmail string
}

type OAuth2Gateway interface {
	// Returns provider-specific OAuth2 token using provider-specific authentification code.
	Authentificate(oauthCode string) (string, error)

	// Returns user info using provider-specific API and given OAuth2 token.
	GetUserInfo(token string) (*UserInfo, error)

	// Builds confirmation URL used when auth callback called without auth code
	BuildConfirmationURL() string
}

type Repository interface {
	Authentificate(email, token string) error
	IsAuthentificated(token string) (bool, error)
}

type StockGateway interface {
	FindOwnerByEmail(email string) (*stock.Owner, error)
}

type SignInResult struct {
	NeedConfirm     bool
	Token           string
	ConfirmationURL string
}

type Service interface {
	security.Gateway
	SignIn(oauthCode string) (*SignInResult, error)
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

func (s *service) SignIn(oauthCode string) (*SignInResult, error) {
	if oauthCode == "" {
		return &SignInResult{
			NeedConfirm:     true,
			ConfirmationURL: s.oAuth2Gateway.BuildConfirmationURL(),
		}, nil
	}
	token, err := s.oAuth2Gateway.Authentificate(oauthCode)
	if err != nil {
		return nil, err
	}
	userInfo, err := s.oAuth2Gateway.GetUserInfo(token)
	if err != nil {
		return nil, err
	}
	owner, err := s.stockGateway.FindOwnerByEmail(userInfo.AccountEmail)
	if err != nil {
		return nil, err
	}
	if owner == nil {
		return nil, errors.WithStack(security.ErrUserNotRegistered)
	}
	if !owner.MayLogin {
		return nil, errors.WithStack(security.ErrUserMayNotLogin)
	}
	return &SignInResult{
		Token: token,
	}, nil
}

func (s *service) BuildConfirmationURL() string {
	return s.oAuth2Gateway.BuildConfirmationURL()
}
