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

type generateItemLabelsHTMLRequest struct {
	IDs []stock.ID
}

type generateItemLabelsHTMLResponse struct {
	HTML []byte
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

func makeGenerateItemLabelsHTMLEndpoint(service Service) endpoint.Endpoint {
	return func(ctx context.Context, request interface{}) (interface{}, error) {
		req := request.(*generateItemLabelsHTMLRequest)
		html, err := service.GenerateItemsLabelsHTML(req.IDs)
		if err != nil {
			return nil, err
		}
		return &generateItemLabelsHTMLResponse{
			HTML: html,
		}, nil
	}
}
