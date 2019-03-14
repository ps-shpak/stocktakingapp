package stocktaking

import (
	"context"
	"time"

	log "github.com/sirupsen/logrus"

	api "stocktakingbackend/stocktakingapi"
)

type loggingMiddleware struct {
	impl   api.BackendServer
	logger *log.Logger
}

// NewLoggingMiddleware creates logging middleware for GRPC server
func NewLoggingMiddleware(impl api.BackendServer, logger *log.Logger) api.BackendServer {
	server := &loggingMiddleware{
		impl:   impl,
		logger: logger,
	}
	return server
}

func (g *loggingMiddleware) SaveItem(ctx context.Context, req *api.SaveItemRequest) (*api.SaveItemResponse, error) {
	start := time.Now()
	res, err := g.impl.SaveItem(ctx, req)
	g.logCall(start, err, "SaveItem", log.Fields{
		"id": req.Id,
	})
	return res, err
}

func (g *loggingMiddleware) LoadItem(ctx context.Context, req *api.LoadItemRequest) (*api.LoadItemResponse, error) {
	start := time.Now()
	res, err := g.impl.LoadItem(ctx, req)
	g.logCall(start, err, "LoadItem", log.Fields{
		"id": req.Id,
	})
	return res, err
}

func (g *loggingMiddleware) ListItems(ctx context.Context, req *api.ListItemsRequest) (*api.ListItemsResponse, error) {
	start := time.Now()
	res, err := g.impl.ListItems(ctx, req)
	g.logCall(start, err, "ListItems", log.Fields{})
	return res, err
}

func (g *loggingMiddleware) DisposeItems(ctx context.Context, req *api.DisposeItemsRequest) (*api.DisposeItemsResponse, error) {
	start := time.Now()
	res, err := g.impl.DisposeItems(ctx, req)
	g.logCall(start, err, "DisposeItems", log.Fields{
		"ids": req.Ids,
	})
	return res, err
}

func (g *loggingMiddleware) TransferItems(ctx context.Context, req *api.TransferItemsRequest) (*api.TransferItemsResponse, error) {
	start := time.Now()
	res, err := g.impl.TransferItems(ctx, req)
	g.logCall(start, err, "TransferItems", log.Fields{
		"ids":       req.Ids,
		"new_owner": req.OwnerId,
	})
	return res, err
}

func (g *loggingMiddleware) ListOwners(ctx context.Context, req *api.ListOwnersRequest) (*api.ListOwnersResponse, error) {
	start := time.Now()
	res, err := g.impl.ListOwners(ctx, req)
	g.logCall(start, err, "ListOwners", log.Fields{})
	return res, err
}

func (g *loggingMiddleware) AddOwners(ctx context.Context, req *api.AddOwnersRequest) (*api.AddOwnersResponse, error) {
	start := time.Now()
	res, err := g.impl.AddOwners(ctx, req)
	g.logCall(start, err, "AddOwners", log.Fields{
		"count": len(req.Owners),
	})
	return res, err
}

func (g *loggingMiddleware) SaveOwner(ctx context.Context, req *api.SaveOwnerRequest) (*api.SaveOwnerResponse, error) {
	start := time.Now()
	res, err := g.impl.SaveOwner(ctx, req)
	g.logCall(start, err, "SaveOwner", log.Fields{
		"id":    req.Id,
		"email": req.Email,
	})
	return res, err
}

func (g *loggingMiddleware) Authorize(ctx context.Context, req *api.AuthorizeRequest) (*api.AuthorizeResponse, error) {
	start := time.Now()
	res, err := g.impl.Authorize(ctx, req)
	g.logCall(start, err, "Authorize", log.Fields{
		"email": req.Email,
	})
	return res, err
}

func (g *loggingMiddleware) logCall(start time.Time, err error, method string, fields log.Fields) {
	duration := time.Since(start)
	entry := g.logger.WithFields(fields).WithField("duration", duration).WithField("method", method)
	if err != nil {
		entry.WithError(err).Error("call failed")
	} else {
		entry.Info("call finished")
	}
}
