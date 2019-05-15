package authorizing

import (
	"context"

	"github.com/go-kit/kit/endpoint"
)

type signInRequest struct {
	oauthCode string
}

type signInResponse struct {
	needConfirmation bool
	confirmationURL  string
	token            string
}

func makeSignInEndpoint(service Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(*signInRequest)
		result, err := service.SignIn(req.oauthCode)
		if err != nil {
			return nil, err
		}
		return &signInResponse{
			needConfirmation: result.NeedConfirm,
			confirmationURL:  result.ConfirmationURL,
			token:            result.Token,
		}, nil
	}
}
