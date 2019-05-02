package labeling

import (
	"context"
	"encoding/json"
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

func MakeHTTPHandler(service Service) http.Handler {
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
		makeGenerateItemLabelsHTMLEndpoint(service),
		decodeGenerateItemLabelsHTMLRequest,
		encodeGenerateItemLabelsHTMLResponse,
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

func decodeGenerateItemLabelsHTMLRequest(_ context.Context, r *http.Request) (interface{}, error) {
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

	return &generateItemLabelsHTMLRequest{
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

func encodeGenerateItemLabelsHTMLResponse(_ context.Context, w http.ResponseWriter, response interface{}) error {
	res := response.(*generateItemLabelsHTMLResponse)
	w.Header().Set("Content-Type", "text/html")
	_, err := w.Write(res.HTML)
	if err != nil {
		return errors.Wrap(err, "failed to write response")
	}
	return nil
}

func encodeError(_ context.Context, err error, w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	switch errors.Cause(err) {
	case stock.ErrUnknownItemID:
		w.WriteHeader(http.StatusNotFound)
	default:
		statusCode := stockerrors.ErrorStatusCode(err)
		w.WriteHeader(statusCode)
	}
	_ = json.NewEncoder(w).Encode(map[string]interface{}{
		"error": err.Error(),
	})
}
