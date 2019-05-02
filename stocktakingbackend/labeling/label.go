package labeling

import (
	"encoding/json"
	"image"

	"github.com/pkg/errors"
	"github.com/skip2/go-qrcode"

	"stocktakingbackend/stock"
)

// TextAnnotation - annotation for the item, descriptive enough for human
type TextAnnotation struct {
	URL   string
	Name  string
	Owner string
}

// Annotation - full annotation for the item, with both QR code and human-readable text
type Annotation struct {
	Text      TextAnnotation
	QRCodeURL string
}

// Label - represents annotation in form suitable for printing
type Label struct {
	urlBuilder URLBuilder
	itemID     stock.ID
	itemName   string
	ownerName  string
	ownerID    stock.ID
}

// NewLabel creates new label
func NewLabel(item stock.Item, urlBuilder URLBuilder) *Label {
	return &Label{
		urlBuilder: urlBuilder,
		itemID:     item.ID(),
		itemName:   item.DisplayName(),
		ownerName:  item.OwnerName(),
		ownerID:    item.OwnerID(),
	}
}

// GenerateQRCode - generates QR code with JSON representation of label annotation
func (l *Label) GenerateQRCode(imageSize int) (image.Image, error) {
	url := l.urlBuilder.BuildLoadItemURL(l.itemID.String())
	// Encode JSON with all sensitive data
	fullData := map[string]interface{}{
		"url":      url,
		"name":     l.itemName,
		"owner":    l.ownerName,
		"owner_id": l.ownerID.String(),
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

// TextAnnotation - returns human-readable annotation for given item
func (l *Label) TextAnnotation() TextAnnotation {
	loadURL := l.urlBuilder.BuildLoadItemURL(l.itemID.String())
	return TextAnnotation{
		URL:   loadURL,
		Name:  l.itemName,
		Owner: l.ownerName,
	}
}

// Annotation - returns annotation with both QR code and human-readable text
func (l *Label) Annotation() Annotation {
	qrCodeURL := l.urlBuilder.BuildQRCodeRelativeURL(l.itemID.String())
	return Annotation{
		Text:      l.TextAnnotation(),
		QRCodeURL: qrCodeURL,
	}
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
