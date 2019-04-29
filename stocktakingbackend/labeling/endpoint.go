package labeling

import (
	"context"
	"image"

	"github.com/go-kit/kit/endpoint"

	"stocktakingbackend/stock"
)

type generateItemLabelRequest struct {
	ID        stock.ID
	ImageSize int
}

type generateItemLabelResponse struct {
	Image image.Image
}

func makeGenerateItemLabelEndpoint(service stock.Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(*generateItemLabelRequest)
		img, err := service.GetItemAnnotationQR(req.ID, req.ImageSize)
		if err != nil {
			return nil, err
		}

		return &generateItemLabelResponse{
			Image: img,
		}, nil
	}
}
