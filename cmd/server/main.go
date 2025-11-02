package main

import (
	"context"
	"embed"
	"io/fs"
	"log/slog"
	"net/http"

	"github.com/rakunlabs/ada"
	"github.com/rakunlabs/chu"
	"github.com/rakunlabs/chu/loader"
	"github.com/rakunlabs/chu/loader/loaderenv"
	"github.com/rakunlabs/into"
	"github.com/rakunlabs/logi"

	"github.com/rakunlabs/ada/handler/folder"
	mcors "github.com/rakunlabs/ada/middleware/cors"
	mencoding "github.com/rakunlabs/ada/middleware/encoding"
	mlog "github.com/rakunlabs/ada/middleware/log"
	mrecover "github.com/rakunlabs/ada/middleware/recover"
	mrequestid "github.com/rakunlabs/ada/middleware/requestid"
	mserver "github.com/rakunlabs/ada/middleware/server"
	mtelemetry "github.com/rakunlabs/ada/middleware/telemetry"
)

var version = "v0.0.0"

//go:embed dist/*
var uiFS embed.FS

type Config struct {
	LogLevel   string           `cfg:"log_level"   default:"info"`
	Address    string           `cfg:"address"     default:":8080"`
	PathPrefix string           `cfg:"path_prefix"`
	Cors       mcors.Cors       `cfg:"cors"`
	Encoding   mencoding.Config `cfg:"encoding"`
}

func main() {
	logi.InitializeLog(logi.WithCaller(false))

	into.Init(run,
		into.WithMsgf("repeatit [%s]", version),
	)
}

func run(ctx context.Context) error {
	cfg := &Config{}
	if err := chu.Load(ctx, "repeatit", cfg, chu.WithLoaderOption(loader.NameEnv, loaderenv.New(
		loaderenv.WithPrefix("REPEATIT_"),
	))); err != nil {
		return err
	}

	if err := logi.SetLogLevel(cfg.LogLevel); err != nil {
		return err
	}

	slog.Info("config loaded", slog.String("config", string(chu.MarshalJSON(cfg))))

	server := ada.New()
	server.Use(
		mrecover.Middleware(),
		mserver.Middleware("repeatit"+":"+version),
		mrequestid.Middleware(),
		mlog.Middleware(),
		mcors.Middleware(mcors.WithConfig(cfg.Cors)),
		mtelemetry.Middleware(),
		mencoding.Middleware(mencoding.WithConfig(cfg.Encoding)),
	)

	group := server.Group(cfg.PathPrefix)

	f, err := folderHandler(cfg.PathPrefix)
	if err != nil {
		return err
	}

	group.GET("/*", f)

	return server.StartWithContext(ctx, cfg.Address)
}

func folderHandler(pathPrefix string) (http.HandlerFunc, error) {
	f, err := folder.New(&folder.Config{
		PrefixPath:     pathPrefix,
		Browse:         false,
		SPA:            false,
		Index:          true,
		StripIndexName: true,
		CacheRegex: []*folder.RegexCacheStore{
			{
				Regex:        `index\.html$`,
				CacheControl: "no-cache",
			},
			{
				Regex:        `.*\.(js|css|wasm|svg)$`,
				CacheControl: "public, max-age=604800, immutable", // 7 days
			},
		},
	})
	if err != nil {
		return nil, err
	}

	uiDist, err := fs.Sub(uiFS, "dist")
	if err != nil {
		return nil, err
	}

	f.SetFs(http.FS(uiDist))

	return f.ServeHTTP, nil
}
