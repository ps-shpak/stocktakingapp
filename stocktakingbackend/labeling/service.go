package labeling

import (
	"errors"
	"image"

	"stocktakingbackend/stock"
	"stocktakingbackend/stocktaking"
)

type Service interface {
	// Returns image with QR code that contains item annotation (in JSON)
	GenerateItemLabelImage(itemID stock.ID, imageSize int) (image.Image, error)

	// Returns HTML for page with list of labels,
	//  where each label contains image with QR code and text.
	GenerateItemsLabelsHTML(itemIDs []stock.ID) ([]byte, error)
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

func (s *service) GenerateItemsLabelsHTML(itemIDs []stock.ID) ([]byte, error) {
	return nil, errors.New("not implemented: GenerateItemsLabelsHTML")
}
