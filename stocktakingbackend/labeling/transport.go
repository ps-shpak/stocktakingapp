package labeling

import (
	"context"
	"image/png"
	"net/http"
	"net/url"

	kithttp "github.com/go-kit/kit/transport/http"
	"github.com/gorilla/mux"
	"github.com/gorilla/schema"
	"github.com/pkg/errors"

	stockerrors "stocktakingbackend/errors"
	"stocktakingbackend/stock"
)

const (
	defaultImageSize = 256
)

func MakeHTTPHandler(service Service, pageGenerator PageGenerator, encodeError kithttp.ErrorEncoder) http.Handler {
	r := mux.NewRouter()

	opts := []kithttp.ServerOption{
		kithttp.ServerErrorEncoder(encodeError),
	}

	generateItemLabelImageHandler := kithttp.NewServer(
		makeGenerateItemLabelImageEndpoint(service),
		decodeGenerateItemLabelImageRequest,
		encodeGenerateItemLabelImageResponse,
		opts...,
	)

	generateItemLabelsHTMLHandler := kithttp.NewServer(
		makeGenerateItemAnnotationsEndpoint(service),
		decodeGenerateItemAnnotationsRequest,
		func(_ context.Context, w http.ResponseWriter, response interface{}) error {
			return writePrintLabelsPage(w, response, pageGenerator)
		},
		opts...,
	)

	r.Handle("/labeling/item/{id}/qr", generateItemLabelImageHandler).Methods("GET")
	r.Handle("/labeling/items", generateItemLabelsHTMLHandler).Methods("GET")

	return r
}

func decodeGenerateItemLabelImageRequest(_ context.Context, r *http.Request) (interface{}, error) {
	// Parse variable part of route
	vars := mux.Vars(r)
	idStr, ok := vars["id"]
	if !ok {
		return nil, stockerrors.NewErrorWithStatus(`missing "id" parameter`, http.StatusBadRequest)
	}
	itemID, err := stock.IDFromString(idStr)
	if err != nil {
		return nil, stockerrors.NewErrorWithStatus("invalid item ID "+idStr, http.StatusBadRequest)
	}

	// Parse GET parameters from url query
	var params struct {
		Size int `schema:"size"`
	}
	queryValues, err := url.ParseQuery(r.URL.RawQuery)
	if err != nil {
		return nil, stockerrors.WrapErrorWithStatus(err, `bad url query`, http.StatusBadRequest)
	}
	decoder := schema.NewDecoder()
	err = decoder.Decode(&params, queryValues)
	if err != nil {
		return nil, stockerrors.WrapErrorWithStatus(err, `bad url query`, http.StatusBadRequest)
	}

	// Fallback to default when size not set
	if params.Size == 0 {
		params.Size = defaultImageSize
	}

	return &generateItemLabelImageRequest{
		ID:        itemID,
		ImageSize: params.Size,
	}, nil
}

func decodeGenerateItemAnnotationsRequest(_ context.Context, r *http.Request) (interface{}, error) {
	// Parse GET parameters from url query
	var params struct {
		IDs []string `schema:"id"`
	}
	queryValues, err := url.ParseQuery(r.URL.RawQuery)
	if err != nil {
		return nil, stockerrors.WrapErrorWithStatus(err, "bad url query", http.StatusBadRequest)
	}
	decoder := schema.NewDecoder()
	err = decoder.Decode(&params, queryValues)
	if err != nil {
		return nil, stockerrors.WrapErrorWithStatus(err, "bad url query", http.StatusBadRequest)
	}
	if len(params.IDs) == 0 {
		return nil, stockerrors.NewErrorWithStatus("bad url query: empty id list", http.StatusBadRequest)
	}

	ids := make([]stock.ID, 0, len(params.IDs))
	for _, idStr := range params.IDs {
		id, err := stock.IDFromString(idStr)
		if err != nil {
			return nil, stockerrors.NewErrorWithStatus("invalid item ID "+idStr, http.StatusBadRequest)
		}
		ids = append(ids, id)
	}

	return &generateItemAnnotationsRequest{
		IDs: ids,
	}, nil
}

func encodeGenerateItemLabelImageResponse(_ context.Context, w http.ResponseWriter, response interface{}) error {
	res := response.(*generateItemLabelImageResponse)

	w.Header().Set("Content-Type", "image/png")
	err := png.Encode(w, res.Image)
	if err != nil {
		return errors.Wrap(err, "failed to encode png")
	}
	return nil
}

func writePrintLabelsPage(w http.ResponseWriter, response interface{}, pageGenerator PageGenerator) error {
	res := response.(*generateItemAnnotationsResponse)
	w.Header().Set("Content-Type", "text/html")
	err := pageGenerator.WritePrintLabelsPage(w, res.Annotations)
	if err != nil {
		return errors.Wrap(err, "failed to write html page")
	}
	return nil
}
