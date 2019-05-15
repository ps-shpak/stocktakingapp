package authorizing

import (
	"fmt"
	"time"

	log "github.com/sirupsen/logrus"

	"stocktakingbackend/errors"
	"stocktakingbackend/security"
)

type loggingMiddleware struct {
	impl   Service
	logger *log.Logger
}

// NewLoggingMiddleware creates logging middleware for given service
func NewLoggingMiddleware(impl Service, logger *log.Logger) Service {
	server := &loggingMiddleware{
		impl:   impl,
		logger: logger,
	}
	return server
}

func (lm *loggingMiddleware) CheckAccess(claim security.AccessClaim, token string) (bool, error) {
	// Avoid logging - method inaccessible for external users
	return lm.impl.CheckAccess(claim, token)
}

func (lm *loggingMiddleware) SignIn(oauthCode string) (*SignInResult, error) {
	start := time.Now()
	result, err := lm.impl.SignIn(oauthCode)
	lm.logCall(start, err, "SignIn", log.Fields{})
	return result, err
}

func (lm *loggingMiddleware) logCall(start time.Time, err error, method string, fields log.Fields) {
	duration := fmt.Sprintf("%v", time.Since(start))
	entry := lm.logger.WithFields(fields).WithFields(log.Fields{
		"duration": duration,
		"method":   method,
	})
	if err != nil {
		stack := errors.GetStacktrace(err)
		entry = entry.WithField("stack", stack)
		entry.WithError(err).Error("call failed")
	} else {
		entry.Info("call finished")
	}
}
