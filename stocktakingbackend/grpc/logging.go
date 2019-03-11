package stocktaking

import (
	"context"
	api "stocktakingbackend/stocktakingapi"
)

type loggingMiddleware struct {
	impl api.BackendServer
}

// NewLoggingMiddleware creates logging middleware for GRPC server
func NewLoggingMiddleware(impl api.BackendServer) api.BackendServer {
	server := &loggingMiddleware{
		impl: impl,
	}
	return server
}

func (g *loggingMiddleware) SaveItem(ctx context.Context, req *api.SaveItemRequest) (*api.SaveItemResponse, error) {
}

func (g *loggingMiddleware) LoadItem(ctx context.Context, req *api.LoadItemRequest) (*api.LoadItemResponse, error) {
}

func (g *loggingMiddleware) ListItems(ctx context.Context, req *api.ListItemsRequest) (*api.ListItemsResponse, error) {
}

func (g *loggingMiddleware) DisposeItems(ctx context.Context, req *api.DisposeItemsRequest) (*api.DisposeItemsResponse, error) {
}

func (g *loggingMiddleware) TransferItems(ctx context.Context, req *api.TransferItemsRequest) (*api.TransferItemsResponse, error) {
}

func (g *loggingMiddleware) ListOwners(ctx context.Context, req *api.ListOwnersRequest) (*api.ListOwnersResponse, error) {
}

func (g *loggingMiddleware) AddOwners(ctx context.Context, req *api.AddOwnersRequest) (*api.AddOwnersResponse, error) {
}

func (g *loggingMiddleware) SaveOwner(ctx context.Context, req *api.SaveOwnerRequest) (*api.SaveOwnerResponse, error) {
}

func (g *loggingMiddleware) Authorize(ctx context.Context, req *api.AuthorizeRequest) (*api.AuthorizeResponse, error) {
}
