package authorizing

import (
	"context"
	"encoding/json"
	"net/http"

	kithttp "github.com/go-kit/kit/transport/http"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"

	stockerrors "stocktakingbackend/errors"
	"stocktakingbackend/security"
)

// EncodeError encodes error into status code and JSON
func EncodeError(_ context.Context, err error, w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	switch errors.Cause(err) {
	case security.ErrUserMayNotLogin:
		w.WriteHeader(http.StatusForbidden)
	case security.ErrUserNotRegistered:
		w.WriteHeader(http.StatusForbidden)
	default:
		statusCode := stockerrors.ErrorStatusCode(err)
		w.WriteHeader(statusCode)
	}
	_ = json.NewEncoder(w).Encode(map[string]interface{}{
		"error": err.Error(),
	})
}

// NewLoggingEncoder creates logging middleware for http error encoder
func NewLoggingEncoder(impl kithttp.ErrorEncoder, logger *log.Logger) kithttp.ErrorEncoder {
	return func(ctx context.Context, err error, w http.ResponseWriter) {
		impl(ctx, err, w)
		stack := stockerrors.GetStacktrace(err)
		logger.WithField("stack", stack).WithError(err).Error("http request failed")
	}
}
