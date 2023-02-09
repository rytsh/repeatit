package translate

import (
	"reflect"
	"testing"
)

func TestDecode(t *testing.T) {
	type args struct {
		data  string
		codec string
	}
	tests := []struct {
		name    string
		args    args
		want    any
		wantErr bool
	}{
		{
			name: "raw",
			args: args{
				data:  "test",
				codec: "raw",
			},
			want:    "test",
			wantErr: false,
		},
		{
			name: "json",
			args: args{
				data:  "{\"test\": \"test\"}",
				codec: "yaml",
			},
			want:    map[string]interface{}{"test": "test"},
			wantErr: false,
		},
		{
			name: "yaml",
			args: args{
				data:  "test: test",
				codec: "yaml",
			},
			want:    map[string]interface{}{"test": "test"},
			wantErr: false,
		},
		{
			name: "toml",
			args: args{
				data:  "test = \"test\"",
				codec: "toml",
			},
			want:    map[string]interface{}{"test": "test"},
			wantErr: false,
		},
		{
			name: "unknown codec",
			args: args{
				data:  "test",
				codec: "unknown",
			},
			want:    nil,
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := Decode(tt.args.data, tt.args.codec)
			if (err != nil) != tt.wantErr {
				t.Errorf("Decode() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("Decode() = %v, want %v", got, tt.want)
			}
		})
	}
}
