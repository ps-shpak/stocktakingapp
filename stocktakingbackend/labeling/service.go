package labeling

import (
	"image"

	"stocktakingbackend/stock"
	"stocktakingbackend/stocktaking"
)

type Service interface {
	// Returns image with QR code that contains item annotation (in JSON)
	GenerateItemLabelImage(itemID stock.ID, imageSize int) (image.Image, error)

	// Returns list with annotations, one annotation per item.
	GenerateItemAnnotations(itemIDs []stock.ID) ([]Annotation, error)
}

type service struct {
	stockService stocktaking.Service
	urlBuilder   URLBuilder
}

// NewService - creates labeling service
func NewService(stockService stocktaking.Service, urlBuilder URLBuilder) Service {
	return &service{
		stockService: stockService,
		urlBuilder:   urlBuilder,
	}
}

func (s *service) GenerateItemLabelImage(itemID stock.ID, imageSize int) (image.Image, error) {
	item, err := s.stockService.LoadItem(itemID)
	if err != nil {
		return nil, err
	}
	label := NewLabel(*item, s.urlBuilder)
	img, err := label.GenerateQRCode(imageSize)
	if err != nil {
		return nil, err
	}
	return img, nil
}

func (s *service) GenerateItemAnnotations(itemIDs []stock.ID) ([]Annotation, error) {
	items, err := s.stockService.LoadItems(itemIDs)
	if err != nil {
		return nil, err
	}
	annotations := make([]Annotation, 0, len(items))
	for _, item := range items {
		label := NewLabel(*item, s.urlBuilder)
		annotations = append(annotations, label.Annotation())
	}
	return annotations, nil
}
