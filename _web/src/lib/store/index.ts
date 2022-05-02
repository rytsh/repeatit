import { fullScreenKeys } from "@/lib/helper/code";
import { writable } from "svelte/store";

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
export const codeTheme = writable("default");

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
export const convertFunctions = ["sprig"];
export const options = ["live"];

const initialConvertConfig = {
  template: "text" as typeof convertTemplates[number],
  functions: new Set(convertFunctions),
  options: new Set(options),
};

export const convertConfig = writable(initialConvertConfig);

// UI settings
const initialUISettings = {
  showSettings: false,
};

export const uiConfig = writable(initialUISettings);
