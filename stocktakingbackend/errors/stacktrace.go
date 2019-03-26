package errors

import (
	"fmt"
	"strings"

	"github.com/pkg/errors"
)

const stackDepth = 5

// GetStacktrace - extracts stacktrace from error if possible, otherwise returns empty slice
func GetStacktrace(err error) []string {
	var stacktrace errors.StackTrace
	if tracer, ok := err.(stackTracer); ok {
		stacktrace = tracer.StackTrace()
	}
	if tracer, ok := errors.Cause(err).(stackTracer); ok {
		stacktrace = tracer.StackTrace()
	}
	return formatStacktrace(stacktrace, stackDepth)
}

type stackTracer interface {
	StackTrace() errors.StackTrace
}

func formatStacktrace(trace errors.StackTrace, depth int) []string {
	if len(trace) == 0 {
		return []string{}
	}

	valued := fmt.Sprintf("%+v", trace[0:depth])
	valued = strings.Replace(valued, "\t", "", -1)
	stack := strings.Split(valued, "\n")

	return stack
}
