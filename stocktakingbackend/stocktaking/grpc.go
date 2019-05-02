package stocktaking

import (
	"context"

	"github.com/pkg/errors"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"stocktakingbackend/stock"
	api "stocktakingbackend/stocktakingapi"
)

type grpcServer struct {
	service Service
}

// NewGRPCServer creates GRPC server which accesses to Service
func NewGRPCServer(service Service) api.BackendServer {
	server := &grpcServer{
		service: service,
	}
	return server
}

func (g *grpcServer) SaveItem(ctx context.Context, req *api.SaveItemRequest) (*api.SaveItemResponse, error) {
	if req.Spec == nil {
		return nil, status.Errorf(codes.InvalidArgument, "missing item spec")
	}
	itemID, err := stock.IDFromString(req.Id)
	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, "invalid item ID")
	}
	ownerID, err := stock.IDFromString(req.Spec.OwnerId)
	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, "invalid owner ID")
	}
	var kind stock.ItemKind
	switch req.Spec.Kind {
	case "equipment":
		kind = stock.ItemKindEquipment
	case "license":
		kind = stock.ItemKindEquipment
	default:
		return nil, status.Errorf(codes.InvalidArgument, "invalid item kind "+req.Spec.Kind)
	}

	itemID, err = g.service.SaveItem(itemID, ownerID, stock.ItemSpec{
		Kind:        kind,
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
		return nil, status.Errorf(codes.InvalidArgument, "invalid item ID "+req.Id)
	}
	item, err := g.service.LoadItem(itemID)
	if err != nil {
		return nil, translateError(err)
	}

	return &api.LoadItemResponse{
		DisplayName: item.DisplayName(),
		OwnerName:   item.OwnerName(),
		Spec: &api.ItemSpec{
			Kind:        string(item.Spec().Kind),
			Category:    item.Spec().Category,
			Place:       item.Spec().Place,
			OwnerId:     item.OwnerID().String(),
			Price:       item.Spec().Price,
			Description: item.Spec().Description,
		},
	}, nil
}

func (g *grpcServer) ListItems(ctx context.Context, req *api.ListItemsRequest) (*api.ListItemsResponse, error) {
	var groupingMethod GroupingMethod
	switch req.GroupingMethod {
	case api.ItemGroupingMethod_ByCategory:
		groupingMethod = GroupByCategory
	case api.ItemGroupingMethod_ByOwner:
		groupingMethod = GroupByOwner
	}
	var kind stock.ItemKind
	switch req.Kind {
	case "equipment":
		kind = stock.ItemKindEquipment
	case "license":
		kind = stock.ItemKindEquipment
	case "":
	default:
		return nil, status.Errorf(codes.InvalidArgument, "invalid item kind "+req.Kind)
	}

	views, err := g.service.ListItems(kind, groupingMethod)
	if err != nil {
		return nil, translateError(err)
	}

	var groups []*api.ItemTreeGroup
	for _, groupView := range views {
		var items []*api.ItemTreeNode
		for _, itemView := range groupView.Items {
			items = append(items, &api.ItemTreeNode{
				DisplayName: itemView.DisplayName,
				Id:          itemView.ID.String(),
				OwnerName:   itemView.OwnerName,
			})
		}
		groups = append(groups, &api.ItemTreeGroup{
			Name:  groupView.Name,
			Items: items,
		})
	}
	return &api.ListItemsResponse{
		Results: groups,
	}, nil
}

func (g *grpcServer) DisposeItems(ctx context.Context, req *api.DisposeItemsRequest) (*api.DisposeItemsResponse, error) {
	var ids []stock.ID
	var err error
	for _, idStr := range req.Ids {
		var id stock.ID
		id, err = stock.IDFromString(idStr)
		if err != nil {
			return nil, status.Errorf(codes.InvalidArgument, "invalid item ID "+idStr)
		}
		ids = append(ids, id)
	}
	err = g.service.DisposeItems(ids)
	if err != nil {
		return nil, translateError(err)
	}
	return &api.DisposeItemsResponse{}, nil
}

func (g *grpcServer) TransferItems(ctx context.Context, req *api.TransferItemsRequest) (*api.TransferItemsResponse, error) {
	ownerID, err := stock.IDFromString(req.OwnerId)
	if err != nil {
		return nil, status.Errorf(codes.InvalidArgument, "invalid owner ID")
	}
	var ids []stock.ID
	for _, idStr := range req.Ids {
		var id stock.ID
		id, err = stock.IDFromString(idStr)
		if err != nil {
			return nil, status.Errorf(codes.InvalidArgument, "invalid item ID "+idStr)
		}
		ids = append(ids, id)
	}
	err = g.service.TransferItems(ids, ownerID)
	if err != nil {
		return nil, translateError(err)
	}
	return &api.TransferItemsResponse{}, nil
}

func (g *grpcServer) ListOwners(ctx context.Context, req *api.ListOwnersRequest) (*api.ListOwnersResponse, error) {
	owners, err := g.service.ListOwners()
	if err != nil {
		return nil, translateError(err)
	}
	var results []*api.ListOwnersResponse_Result
	for _, owner := range owners {
		result := &api.ListOwnersResponse_Result{
			UserId:   owner.ID.String(),
			Email:    owner.Email,
			Name:     owner.Name,
			MayLogin: owner.MayLogin,
		}
		results = append(results, result)
	}
	return &api.ListOwnersResponse{
		Results: results,
	}, nil
}

func (g *grpcServer) AddOwners(ctx context.Context, req *api.AddOwnersRequest) (*api.AddOwnersResponse, error) {
	var results []*api.AddOwnersResponse_Owner
	for _, owner := range req.Owners {
		spec := stock.OwnerSpec{
			Email: owner.Email,
			Name:  owner.Name,
		}
		id, err := g.service.AddOwner(spec)
		if err != nil {
			return nil, translateError(err)
		}
		results = append(results, &api.AddOwnersResponse_Owner{
			Id: id.String(),
		})
	}
	return &api.AddOwnersResponse{
		Owners: results,
	}, nil
}

func (g *grpcServer) SaveOwner(ctx context.Context, req *api.SaveOwnerRequest) (*api.SaveOwnerResponse, error) {
	id, err := stock.IDFromString(req.Id)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, "invalid owner id"+req.Id)
	}
	spec := stock.OwnerSpec{
		Email: req.Email,
		Name:  req.Name,
	}
	err = g.service.SaveOwner(id, spec, req.MayLogin)
	if err != nil {
		return nil, translateError(err)
	}
	return &api.SaveOwnerResponse{}, nil
}

func (g *grpcServer) Authorize(ctx context.Context, req *api.AuthorizeRequest) (*api.AuthorizeResponse, error) {
	id, err := g.service.Authorize(req.Email)
	if err != nil {
		return nil, translateError(err)
	}
	return &api.AuthorizeResponse{
		Id: id.String(),
	}, nil
}

func translateError(err error) error {
	switch errors.Cause(err) {
	case stock.ErrUnknownItemID:
		return status.Error(codes.NotFound, err.Error())
	case stock.ErrUnknownOwnerID:
		return status.Error(codes.NotFound, err.Error())
	case stock.ErrAuthForbidden:
		return status.Error(codes.PermissionDenied, err.Error())
	}
	return err
}
