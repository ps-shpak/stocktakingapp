package labeling

import (
	"html/template"
	"io"

	"github.com/pkg/errors"

	"stocktakingbackend/labeling/data"
)

const (
	printLabelsPageTpl = "print-labels.gohtml"
)

type PageGenerator interface {
	WritePrintLabelsPage(w io.Writer, annotations []Annotation) error
}

type pageGenerator struct {
	printLabelsTpl *template.Template
}

func NewPageGenerator() (PageGenerator, error) {
	printLabelsBytes, err := data.Asset(printLabelsPageTpl)
	if err != nil {
		return nil, errors.Wrap(err, "cannot create page generator")
	}
	printLabelsTpl, err := template.New("print-labels").Parse(string(printLabelsBytes))
	if err != nil {
		return nil, errors.Wrap(err, "cannot create page generator")
	}
	generator := &pageGenerator{
		printLabelsTpl: printLabelsTpl,
	}
	return generator, nil
}

func (pg *pageGenerator) WritePrintLabelsPage(w io.Writer, annotations []Annotation) error {
	var d struct {
		Annotations []Annotation
	}
	d.Annotations = annotations
	return pg.printLabelsTpl.Execute(w, d)
}
