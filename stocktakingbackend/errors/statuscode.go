package errors

import (
	"fmt"
	"net/http"
)

// WithStatusCode - error with http status code
type WithStatusCode interface {
	StatusCode() int
}

type WithCause interface {
	Cause() error
}

type errorWithStatus struct {
	next       error
	reason     string
	statusCode int
}

func NewErrorWithStatus(reason string, statusCode int) error {
	return &errorWithStatus{
		reason:     reason,
		statusCode: statusCode,
	}
}

func WrapErrorWithStatus(err error, reason string, statusCode int) error {
	return &errorWithStatus{
		next:       err,
		reason:     reason,
		statusCode: statusCode,
	}
}

func (e *errorWithStatus) Error() string {
	return fmt.Sprintf("%s: %s", e.reason, e.next.Error())
}

func (e *errorWithStatus) StatusCode() int {
	return e.statusCode
}

func (e *errorWithStatus) Cause() error {
	return e.next
}

// Returns status code 500 Internal Server Error or custom status code from error
func ErrorStatusCode(err error) int {
	var statusCode = http.StatusInternalServerError
	for err != nil {
		errWithStatusCode, ok := err.(WithStatusCode)
		if ok {
			statusCode = errWithStatusCode.StatusCode()
		}
		errWithCause, ok := err.(WithCause)
		if ok {
			err = errWithCause.Cause()
		} else {
			err = nil
		}
	}
	return statusCode
}
