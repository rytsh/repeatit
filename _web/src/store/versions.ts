const goVersion = import.meta.env.VITE_GO_VERSION;
const sprigVersion = import.meta.env.VITE_SPRIG_VERSION;

const versions = [
  {
    name: "go",
    version: goVersion,
    link: "https://golang.org/doc/devel/release.html",
  },
  {
    name: "sprig",
    version: sprigVersion,
    link: "https://masterminds.github.io/sprig",
  },
];

export default versions;
