package labeling

import (
	"encoding/json"
	"image"

	"github.com/pkg/errors"
	"github.com/skip2/go-qrcode"

	"stocktakingbackend/stock"
)

// Annotation - annotation for the item, descriptive enough for human
type Annotation struct {
	ID        stock.ID
	Name      string
	OwnerName string
	OwnerID   stock.ID
}

// Label - represents annotation in form suitable for printing
type Label struct {
	urlBuilder URLBuilder
	annotation Annotation
}

// NewLabel creates new label
func NewLabel(item stock.Item, urlBuilder URLBuilder) *Label {
	ann := Annotation{
		ID:        item.ID(),
		Name:      item.DisplayName(),
		OwnerName: item.OwnerName(),
		OwnerID:   item.OwnerID(),
	}
	return &Label{
		urlBuilder: urlBuilder,
		annotation: ann,
	}
}

// GenerateQRCode - generates QR code with JSON representation of label annotation
func (l *Label) GenerateQRCode(imageSize int) (image.Image, error) {
	url := l.urlBuilder.BuildLoadItemURL(l.annotation)

	// Encode JSON with all sensitive data
	fullData := map[string]interface{}{
		"url":      url,
		"name":     l.annotation.Name,
		"owner":    l.annotation.OwnerName,
		"owner_id": l.annotation.OwnerID.String(),
	}
	img, err := encodeValuesToQRCode(fullData, imageSize)
	if err != nil {
		// Maybe too much data (QR code has limited capacity),
		//  so try again with minimal data and predictable size
		minimalData := map[string]interface{}{
			"url": url,
		}
		img, err = encodeValuesToQRCode(minimalData, imageSize)
		if err != nil {
			return nil, err
		}
	}
	return img, nil
}

func encodeValuesToQRCode(data map[string]interface{}, imageSize int) (image.Image, error) {
	bytes, err := json.Marshal(data)
	if err != nil {
		return nil, errors.Wrap(err, "failed to marshal JSON")
	}
	// Use high recovery level to make scanning more reliable
	code, err := qrcode.New(string(bytes), qrcode.High)
	if err != nil {
		return nil, errors.Wrap(err, "failed to generate QR code")
	}
	return code.Image(imageSize), nil
}
