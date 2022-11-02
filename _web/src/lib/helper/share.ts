import type { IExample } from "@/examples";
import { Base64 } from "js-base64";
import { get } from "svelte/store";
import { codes, getConfig, type configType } from "@/lib/store";
import { push } from "svelte-spa-router";

const shareURL = "/share/";

interface shareConfig {
  title?: string;
  text?: string;
  url: string;
}

// base64 hash read
const loadHash = (data: string) => {
  return JSON.parse(Base64.decode(data)) as IExample;
};

// base64 hash write
const saveHash = (data: IExample) => {
  const json = JSON.stringify(data);
  return Base64.encode(json);
};

const shareLink = (v: shareConfig) => {
  navigator.share(v);
};

const getLink = (changeURL: boolean, config: configType | null = null) => {
  const { template, input } = get(codes);
  if (config == null) {
    config = getConfig();
  }

  console.log(config);
  const hash = saveHash({ template, input, config });
  if (changeURL) {
    push(shareURL + hash);
  }

  return window.location.origin + window.location.pathname + "#" + shareURL + hash;
};

export { loadHash, saveHash, shareLink, getLink, shareURL };
export type { shareConfig };
