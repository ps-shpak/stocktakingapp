package labeling

import (
	"context"
	"image"

	"github.com/go-kit/kit/endpoint"

	"stocktakingbackend/stock"
)

type generateItemLabelImageRequest struct {
	ID        stock.ID
	ImageSize int
}

type generateItemLabelImageResponse struct {
	Image image.Image
}

type generateItemAnnotationsRequest struct {
	IDs []stock.ID
}

type generateItemAnnotationsResponse struct {
	Annotations []Annotation
}

func makeGenerateItemLabelImageEndpoint(service Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(*generateItemLabelImageRequest)
		img, err := service.GenerateItemLabelImage(req.ID, req.ImageSize)
		if err != nil {
			return nil, err
		}
		return &generateItemLabelImageResponse{
			Image: img,
		}, nil
	}
}

func makeGenerateItemAnnotationsEndpoint(service Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(*generateItemAnnotationsRequest)
		anns, err := service.GenerateItemAnnotations(req.IDs)
		if err != nil {
			return nil, err
		}
		return &generateItemAnnotationsResponse{
			Annotations: anns,
		}, nil
	}
}
