package labeling

import (
	"fmt"
	"net/url"
)

type URLBuilder interface {
	BuildLoadItemURL(ann Annotation) string
	BuildShowItemURL(ann Annotation) string
}

func NewURLBuilder(siteDomain string) URLBuilder {
	return &urlBuilder{
		siteDomain: siteDomain,
	}
}

type urlBuilder struct {
	siteDomain string
}

func (b *urlBuilder) BuildLoadItemURL(ann Annotation) string {
	// See also "LoadItem(...)" method in "api.proto"
	id := url.QueryEscape(ann.ID.String())
	return fmt.Sprintf("%s/stocktaking/item?id=%s", b.siteDomain, id)
}

func (b *urlBuilder) BuildShowItemURL(ann Annotation) string {
	// TODO: return URL for user-friendly page with item description,
	//  probably like "example.com/index.html?item_id=$ID"
	return b.BuildLoadItemURL(ann)
}
