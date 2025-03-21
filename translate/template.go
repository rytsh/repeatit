package translate

import (
	"fmt"
	htmlTemplate "html/template"
	"io"
	textTemplate "text/template"

	"github.com/Masterminds/sprig/v3"
	"github.com/rytsh/repeatit/translate/templates/helm"
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

	FuncSprig     textTemplate.FuncMap
	FuncSprigHtml htmlTemplate.FuncMap
	FuncHelm      func(*textTemplate.Template) textTemplate.FuncMap
}

func (t Template) Ext(value any, templateValue string, templateType Tmp, funcList string) ([]byte, error) {
	switch templateType {
	case TXT:
		template, err := t.TXT.Clone()
		if err != nil {
			return nil, fmt.Errorf("clone text template error: %w", err)
		}

		switch funcList {
		case "sprig":
			template = template.Funcs(t.FuncSprig)
		case "helm":
			template = template.Funcs(t.FuncHelm(template))
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

		switch funcList {
		case "sprig":
			template = template.Funcs(t.FuncSprigHtml)
		case "helm":
			return nil, fmt.Errorf("helm functions are not supported for html templates")
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
	t := &Template{
		TXT:  textTemplate.New("txt"),
		HTML: htmlTemplate.New("html"),
	}

	t.FuncSprig = sprig.TxtFuncMap()
	t.FuncSprigHtml = sprig.HtmlFuncMap()
	t.FuncHelm = helm.FuncMap()

	return t
}

func SetGlobalTemplate(t *Template) {
	GlobalTemplate = t
}
