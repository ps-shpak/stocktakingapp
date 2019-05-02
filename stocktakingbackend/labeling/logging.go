package labeling

import (
	"fmt"
	"image"
	"time"

	log "github.com/sirupsen/logrus"

	"stocktakingbackend/errors"
	"stocktakingbackend/stock"
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

func (lm *loggingMiddleware) GenerateItemLabelImage(itemID stock.ID, imageSize int) (image.Image, error) {
	start := time.Now()
	img, err := lm.impl.GenerateItemLabelImage(itemID, imageSize)
	lm.logCall(start, err, "GenerateItemLabelImage", log.Fields{
		"itemID":    itemID,
		"imageSize": imageSize,
	})
	return img, err
}

func (lm *loggingMiddleware) GenerateItemAnnotations(itemIDs []stock.ID) ([]Annotation, error) {
	start := time.Now()
	html, err := lm.impl.GenerateItemAnnotations(itemIDs)
	lm.logCall(start, err, "GenerateItemAnnotations", log.Fields{
		"itemIDs": itemIDs,
	})
	return html, err
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
