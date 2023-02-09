package translate

import (
	"fmt"
	htmlTemplate "html/template"
	"io"
	textTemplate "text/template"

	"github.com/Masterminds/sprig/v3"
)

type Tmp int

const (
	TXT Tmp = iota
	HTML
)

type TemplateExecuter interface {
	Execute(wr io.Writer, data interface{}) error
}

var GlobalTemplate *Template

type Template struct {
	TXT  *textTemplate.Template
	HTML *htmlTemplate.Template
}

func (t Template) Ext(value any, templateValue string, templateType Tmp, funcList []string) ([]byte, error) {
	switch templateType {
	case TXT:
		template, err := t.TXT.Clone()
		if err != nil {
			return nil, fmt.Errorf("clone text template error: %w", err)
		}

		for _, f := range funcList {
			if f == "sprig" {
				template = template.Funcs(sprig.TxtFuncMap())
			}
		}

		tmp, err := template.Parse(templateValue)
		if err != nil {
			return nil, fmt.Errorf("parse text template error: %w", err)
		}

		return Execute(value, tmp)
	case HTML:
		template, err := t.HTML.Clone()
		if err != nil {
			return nil, fmt.Errorf("clone html template error: %w", err)
		}

		for _, f := range funcList {
			if f == "sprig" {
				template = template.Funcs(sprig.HtmlFuncMap())
			}
		}

		tmp, err := template.Parse(templateValue)
		if err != nil {
			return nil, fmt.Errorf("parse html template error: %w", err)
		}

		return Execute(value, tmp)
	default:
		return nil, fmt.Errorf("unknown template type")
	}
}

func NewTemplate() *Template {
	return &Template{
		TXT:  textTemplate.New("txt"),
		HTML: htmlTemplate.New("html"),
	}
}

func SetGlobalTemplate(t *Template) {
	GlobalTemplate = t
}
