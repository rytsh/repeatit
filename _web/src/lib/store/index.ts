import { fullScreenKeys } from "@/lib/helper/code";
import { get, writable } from "svelte/store";

const initialEditorConfig: CodeMirror.EditorConfiguration = {
  mode: "yaml",
  lineNumbers: true,
  tabSize: 2,
  lineWrapping: true,
  styleActiveLine: true,
  matchBrackets: true,
  showTrailingSpace: true,
  extraKeys: fullScreenKeys,
};

export const examples = writable(undefined);

export const editorConfig = writable(initialEditorConfig);

// Loading
export const loading = writable(true);

// Loading
export const codeTheme = writable("light");

// Codes
const initialCodes = {
  template: "",
  input: "",
  output: "",
  trigger: false,
  triggerError: false,
  error: false,
  success: false,
};

export type codesKeys = "template" | "input" | "output";

export const codes = writable(initialCodes);

// Convert settings
export const convertTemplates = ["text", "html"];
export const convertFunctions = ["", "sprig", "helm"];
export const options = ["live"];

enum inputTypes {
  raw = "raw",
  yaml = "yaml",
  toml = "toml",
}

export const inputTypesValues = Object.values(inputTypes);

const initialConvertConfig = {
  template: "text" as typeof convertTemplates[number],
  functions: "helm" as typeof convertFunctions[number],
  options: new Set(options),
  inputType: inputTypes.yaml,
};

export type configType = {
  template: string;
  functions: string;
  options: string[];
  fullScreenHTML: boolean,
  inputType?: inputTypes,
};

// convert config to json
export const getConfig = () => {
  const { template, functions, options, inputType } = get(convertConfig);
  return {
    template,
    fullScreenHTML: get(fullScreenHTML),
    functions: functions,
    options: Array.from(options),
    inputType,
  } as configType;
};

// set config from configType
export const setConfig = (config: configType) => {
  console.log(config);
  fullScreenHTML.set(config.fullScreenHTML);
  convertConfig.update((v) => ({
    ...v,
    template: config.template,
    functions: config.functions,
    options: new Set(config.options),
    inputType: config.inputType ?? inputTypes.yaml,
  }));
};

export const fullScreenHTML = writable(null as boolean | null);
export const convertConfig = writable(initialConvertConfig);

// UI settings
const initialUISettings = {
  showSettings: false,
};

export const uiConfig = writable(initialUISettings);
