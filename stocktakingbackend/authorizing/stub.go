package authorizing

// Creates stub OAuth2 Gateway useful for local development
func NewStubOAuth2Gateway(accountEmail string) OAuth2Gateway {
	return &stubOAuth2Gateway{}
}

type stubOAuth2Gateway struct {
	accountEmail string
}

func (g *stubOAuth2Gateway) Authentificate(oauthCode string) (string, error) {
	// Return fake token.
	return "abcd1234fe", nil
}

func (g *stubOAuth2Gateway) GetUserInfo(token string) (*UserInfo, error) {
	return &UserInfo{
		AccountEmail: g.accountEmail,
	}, nil
}

func (g *stubOAuth2Gateway) NeedLogin(oauthCode string) bool {
	return false
}

func (g *stubOAuth2Gateway) BuildLoginURL() string {
	return ""
}
