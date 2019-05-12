// +build false
// Temporary excluded from build

package authorizing

import (
	"context"

	"github.com/go-kit/kit/endpoint"
)

type signInRequest struct {
	oauthCode string
}

type signInResponse struct {
	token string
}

func makeSignInEndpoint(service Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(*signInRequest)
		token, err := service.SignIn(req.oauthCode)
		if err != nil {
			return nil, err
		}
		return &signInResponse{
			token: token,
		}, nil
	}
}
