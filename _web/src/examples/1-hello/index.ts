import input from "./input?raw";
import template from "./template?raw";
import type { IExample } from "..";
import { inputTypes } from "@/lib/store";

const hello:IExample = {
  name: "Hello",
  template: template,
  input: input,
  config: {
    template: "text",
    functions: "helm",
    inputType: inputTypes.yaml,
  }
};

export { hello };
