import { writable } from "svelte/store";

const initialEditorConfig: CodeMirror.EditorConfiguration = {
  mode: "javascript",
  lineNumbers: true,
  tabSize: 2,
  scrollbarStyle: "native",
};

export const examples = writable(undefined);

export const editorConfig = writable(initialEditorConfig);

// Loading
export const loading = writable(true);

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

const initialConvertConfig = {
  template: "text" as typeof convertTemplates[number],
  functions: new Set(["sprig"]),
};

export const convertConfig = writable(initialConvertConfig);

// UI settings
const initialUISettings = {
  showSettings: false,
};

export const uiConfig = writable(initialUISettings);
