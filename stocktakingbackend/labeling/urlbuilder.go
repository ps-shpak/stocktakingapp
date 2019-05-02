package labeling

import (
	"fmt"
	"net/url"
)

type URLBuilder interface {
	BuildLoadItemURL(itemID string) string
	BuildShowItemURL(itemID string) string
	BuildQRCodeRelativeURL(itemID string) string
}

func NewURLBuilder(siteDomain string) URLBuilder {
	return &urlBuilder{
		siteDomain: siteDomain,
	}
}

type urlBuilder struct {
	siteDomain string
}

func (b *urlBuilder) BuildLoadItemURL(itemID string) string {
	// See also "LoadItem(...)" method in "api.proto"
	return fmt.Sprintf("%s/stocktaking/item?id=%s", b.siteDomain, url.QueryEscape(itemID))
}

func (b *urlBuilder) BuildShowItemURL(itemID string) string {
	// TODO: return URL for user-friendly page with item description,
	//  probably like "example.com/index.html?item_id=$ID"
	return b.BuildLoadItemURL(itemID)
}

func (b *urlBuilder) BuildQRCodeRelativeURL(itemID string) string {
	// See also "transport.go"
	return fmt.Sprintf("/labeling/item/%s/qr", itemID)
}
