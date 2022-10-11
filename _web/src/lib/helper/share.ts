import type { IExample } from "@/examples";
import { Base64 } from 'js-base64';

// base64 hash read
const loadHash = (data: string) => {
  return JSON.parse(Base64.decode(data)) as IExample;
};

// base64 hash write
const saveHash = (data: IExample) => {
  const json = JSON.stringify(data);
  return Base64.encode(json);
};

export { loadHash, saveHash };
