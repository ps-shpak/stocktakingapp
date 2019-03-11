package stocktaking

import (
	"context"
	"stocktakingbackend/stock"
	api "stocktakingbackend/stocktakingapi"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type grpcServer struct {
	service stock.Service
}

// NewGRPCServer creates GRPC server which accesses to stock.Service
func NewGRPCServer(service stock.Service) api.BackendServer {
	server := &grpcServer{
		service: service,
	}
	return server
}

func (g *grpcServer) SaveItem(ctx context.Context, req *api.SaveItemRequest) (*api.SaveItemResponse, error) {
	itemID, err := stock.IDFromString(req.Id)
	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, "invalid item ID")
	}
	ownerID, err := stock.IDFromString(req.Spec.OwnerId)
	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, "invalid owner ID")
	}
	itemID, err = g.service.SaveItem(itemID, ownerID, stock.ItemSpec{
		Category:    req.Spec.Category,
		Place:       req.Spec.Place,
		Price:       req.Spec.Price,
		Description: req.Spec.Description,
	})
	if err != nil {
		return nil, translateError(err)
	}
	return &api.SaveItemResponse{
		Id: itemID.String(),
	}, nil
}

func (g *grpcServer) LoadItem(ctx context.Context, req *api.LoadItemRequest) (*api.LoadItemResponse, error) {
	itemID, err := stock.IDFromString(req.Id)
	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, "invalid item ID")
	}
	item, err := g.service.LoadItem(itemID)
	if err != nil {
		return nil, translateError(err)
	}

	return &api.LoadItemResponse{
		DisplayName: item.DisplayName(),
		OwnerName:   item.OwnerName(),
		Spec: &api.ItemSpec{
			Category:    item.Spec().Category,
			Place:       item.Spec().Place,
			OwnerId:     item.OwnerID().String(),
			Price:       item.Spec().Price,
			Description: item.Spec().Description,
		},
	}, nil
}

func (g *grpcServer) ListItems(ctx context.Context, req *api.ListItemsRequest) (*api.ListItemsResponse, error) {
}

func (g *grpcServer) DisposeItems(ctx context.Context, req *api.DisposeItemsRequest) (*api.DisposeItemsResponse, error) {
}

func (g *grpcServer) TransferItems(ctx context.Context, req *api.TransferItemsRequest) (*api.TransferItemsResponse, error) {
}

func (g *grpcServer) ListOwners(ctx context.Context, req *api.ListOwnersRequest) (*api.ListOwnersResponse, error) {
}

func (g *grpcServer) AddOwners(ctx context.Context, req *api.AddOwnersRequest) (*api.AddOwnersResponse, error) {
}

func (g *grpcServer) SaveOwner(ctx context.Context, req *api.SaveOwnerRequest) (*api.SaveOwnerResponse, error) {
}

func (g *grpcServer) Authorize(ctx context.Context, req *api.AuthorizeRequest) (*api.AuthorizeResponse, error) {
}

func translateError(err error) error {
	switch err {
	case stock.ErrUnknownID:
		return status.Error(codes.NotFound, err.Error())
	case stock.ErrAuthForbidden:
		return status.Error(codes.PermissionDenied, err.Error())
	}
	return err
}
