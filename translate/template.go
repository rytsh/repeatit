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

func (t Template) Ext(v map[string]interface{}, file string, templateType Tmp, funcList []string) ([]byte, error) {
	switch templateType {
	case TXT:
		funct := t.TXT

		funct2, err := funct.Clone()
		if err != nil {
			return nil, fmt.Errorf("clone text template error: %w", err)
		}

		for _, f := range funcList {
			if f == "sprig" {
				funct2 = funct2.Funcs(sprig.TxtFuncMap())
			}
		}

		tmp, err := funct2.Parse(file)
		if err != nil {
			return nil, fmt.Errorf("parse text template error: %w", err)
		}

		return Execute(v, tmp)
	case HTML:
		funct := t.HTML

		funct2, err := funct.Clone()
		if err != nil {
			return nil, fmt.Errorf("clone html template error: %w", err)
		}

		for _, f := range funcList {
			if f == "sprig" {
				funct2 = funct2.Funcs(sprig.HtmlFuncMap())
			}
		}

		tmp, err := funct2.Parse(file)
		if err != nil {
			return nil, fmt.Errorf("parse html template error: %w", err)
		}

		return Execute(v, tmp)
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
