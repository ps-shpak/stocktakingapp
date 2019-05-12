package authorizing

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"time"

	"github.com/pkg/errors"
)

// See also https://developers.google.com/identity/protocols/OAuth2WebServer
const (
	GoogleAPIDomain        = "https://www.googleapis.com"
	GoogleAccountsDomain   = "https://accounts.google.com"
	GoogleGetToken         = GoogleAPIDomain + "/oauth2/v4/token"
	GoogleEndpointPeopleMe = GoogleAPIDomain + "/plus/v1/people/me"
	GoogleConfirmationURL  = GoogleAccountsDomain + "/o/oauth2/v2/auth"

	// GooglePlusMeScope - scope for GoogleEndpointPeopleMe API method
	GooglePlusMeScope = "https://www.googleapis.com/auth/plus.me"
)

type GoogleCredentials struct {
	ClientID     string
	ClientSecret string
	RedirectURI  string
}

// See also https://developers.google.com/identity/protocols/OAuth2WebServer
type GoogleOAuth2Gateway interface {
	OAuth2Gateway

	// Parses auth code from external request to auth callback (a.k.a. redirect URI)
	ParseOAuthCode(req *http.Request) string

	// Builds confirmation URL which reports "scope" to googleapis
	BuildConfirmationURL() string
}

type googleOAuth2Gateway struct {
	creds  *GoogleCredentials
	client *http.Client
}

func NewGoogleOAuth2Gateway(creds *GoogleCredentials) GoogleOAuth2Gateway {
	g := &googleOAuth2Gateway{
		creds: creds,
		client: &http.Client{
			Timeout: 20 * time.Second,
		},
	}
	return g
}

func (g *googleOAuth2Gateway) Authentificate(oauthCode string) (string, error) {
	data := url.Values{
		"code":          []string{oauthCode},
		"client_id":     []string{g.creds.ClientID},
		"client_secret": []string{g.creds.ClientSecret},
		"redirect_uri":  []string{g.creds.RedirectURI},
		"grant_type":    []string{"authorization_code"},
	}
	res, err := g.client.PostForm(GoogleGetToken, data)
	bytes, err := g.readResponseBytes(res, err)
	if err != nil {
		return "", err
	}
	return string(bytes), nil
}

func (g *googleOAuth2Gateway) GetUserInfo(token string) (*UserInfo, error) {
	var responseData struct {
		Emails []struct {
			Value string `json:"value"`
			Type  string `json:"type"`
		} `json:"emails"`
	}

	res, err := g.client.Get(GoogleEndpointPeopleMe)
	err = g.readResponseJSON(res, err, &responseData)
	if err != nil {
		return nil, err
	}

	var accountEmail string
	for _, email := range responseData.Emails {
		if email.Type == "account" {
			accountEmail = email.Value
		}
	}
	if accountEmail == "" {
		return nil, errors.New("failed to get user account email")
	}

	return &UserInfo{
		Email: accountEmail,
	}, nil
}

func (g *googleOAuth2Gateway) ParseOAuthCode(req *http.Request) string {
	return req.URL.Query().Get("code")
}

func (g *googleOAuth2Gateway) BuildConfirmationURL() string {
	values := url.Values{
		"response_type": []string{"code"},
		"client_id":     []string{g.creds.ClientID},
		"redirect_uri":  []string{g.creds.RedirectURI},
		"scope":         []string{GooglePlusMeScope},
	}
	return fmt.Sprintf("%s?%s", GoogleConfirmationURL, values.Encode())
}

func (g *googleOAuth2Gateway) readResponseBytes(res *http.Response, err error) ([]byte, error) {
	if err != nil {
		return nil, errors.Wrapf(err, "request to %s failed", res.Request.URL.String())
	}
	if res.StatusCode != http.StatusOK {
		return nil, errors.Wrapf(err, "request to %s failed: status %s", res.Request.URL.String(), res.Status)
	}
	bytes, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, errors.Wrapf(err, "failed to read response from %s", res.Request.URL.String())
	}
	return bytes, nil
}

func (g *googleOAuth2Gateway) readResponseJSON(res *http.Response, err error, result interface{}) error {
	bytes, err := g.readResponseBytes(res, err)
	if err != nil {
		return err
	}
	err = json.Unmarshal(bytes, result)
	return errors.Wrapf(err, "failed to unmarshal JSON response from %s", res.Request.URL.String())
}
