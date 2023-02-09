package translate

import (
	"reflect"
	"testing"
)

func TestTemplate_Ext(t *testing.T) {
	type args struct {
		value         any
		templateValue string
		templateType  Tmp
		funcList      []string
	}
	tests := []struct {
		name     string
		args     args
		want     []byte
		wantSkip bool
		wantErr  bool
	}{
		{
			name: "text template",
			args: args{
				value:         "<h1>test</h1>",
				templateValue: "{{ . }}",
				templateType:  TXT,
			},
			want:    []byte("<h1>test</h1>"),
			wantErr: false,
		},
		{
			name: "html template",
			args: args{
				value:         "<h1>test</h1>",
				templateValue: "{{ . }}",
				templateType:  HTML,
			},
			want:    []byte("&lt;h1&gt;test&lt;/h1&gt;"),
			wantErr: false,
		},
		{
			name: "uuid generate",
			args: args{
				value:         nil,
				templateValue: "{{ uuidv4 }}",
				templateType:  HTML,
				funcList:      []string{"sprig"},
			},
			wantSkip: true,
			wantErr:  false,
		},
	}

	tmp := NewTemplate()

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := tmp.Ext(tt.args.value, tt.args.templateValue, tt.args.templateType, tt.args.funcList)
			if (err != nil) != tt.wantErr {
				t.Errorf("Template.Ext() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !tt.wantSkip && !reflect.DeepEqual(got, tt.want) {
				t.Errorf("Template.Ext() = %s, want %s", got, tt.want)
			}
		})
	}
}
