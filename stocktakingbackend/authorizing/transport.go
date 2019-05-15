package authorizing

import (
	"context"
	"fmt"
	"net/http"
	"net/url"

	kithttp "github.com/go-kit/kit/transport/http"
	"github.com/gorilla/mux"
	"github.com/gorilla/schema"

	stockerrors "stocktakingbackend/errors"
)

const (
	TokenCookie       = "stocktoken"
	TokenCookieMaxAge = (10*24 + 12) * 3600 // 10,5 days in seconds
)

func MakeHTTPHandler(service Service, encodeError kithttp.ErrorEncoder) http.Handler {
	r := mux.NewRouter()

	opts := []kithttp.ServerOption{
		kithttp.ServerErrorEncoder(encodeError),
	}

	signInHandler := kithttp.NewServer(
		makeSignInEndpoint(service),
		decodeSignInRequest,
		encodeSignInResponse,
		opts...,
	)

	r.Handle("/authorizing/token", signInHandler).Methods("GET")

	return r
}

func decodeSignInRequest(_ context.Context, r *http.Request) (interface{}, error) {
	// Parse GET parameters from url query
	var params struct {
		Code string `schema:"code"`
	}
	queryValues, err := url.ParseQuery(r.URL.RawQuery)
	if err != nil {
		return nil, stockerrors.WrapErrorWithStatus(err, `bad url query`, http.StatusBadRequest)
	}
	decoder := schema.NewDecoder()
	err = decoder.Decode(&params, queryValues)
	if err != nil {
		return nil, stockerrors.WrapErrorWithStatus(err, `bad url query`, http.StatusBadRequest)
	}
	return &signInRequest{
		oauthCode: params.Code,
	}, nil
}

func encodeSignInResponse(ctx context.Context, w http.ResponseWriter, response interface{}) error {
	res := response.(*signInResponse)
	if res.needConfirmation {
		req := buildRequest(ctx)
		http.Redirect(w, req, res.confirmationURL, http.StatusMovedPermanently)
	} else {
		cookieHeader := fmt.Sprintf("%s=%s; Max-Age=%d", TokenCookie, res.token, TokenCookieMaxAge)
		w.Header().Set("Set-Cookie", cookieHeader)
		w.WriteHeader(http.StatusOK)
	}
	return nil
}

// Re-builds request with data enough for http.Redirect
func buildRequest(ctx context.Context) *http.Request {
	r := new(http.Request)
	r.Method = ctx.Value(kithttp.ContextKeyRequestMethod).(string)
	r.URL.Path = ctx.Value(kithttp.ContextKeyRequestPath).(string)
	r.Host = ctx.Value(kithttp.ContextKeyRequestHost).(string)
	return r
}
