import { codes, convertConfig } from "@/lib/store";
import { get } from "svelte/store";

const run = async () => {
  const values = get(codes);
  const config = get(convertConfig);

  const render = window["render"];
  if (render) {
    let output: string;
    try {
      let nullValue = config.inputType == "raw" ? "" : "null";

      output = await render(
        values.input == "" ? nullValue : values.input,
        values.template,
        config.template,
        config.functions,
        config.inputType,
      );
    } catch (error) {
      codes.update((v) => ({
        ...v,
        output: error.toString(),
        trigger: !v.trigger,
        triggerError: !v.triggerError,
        error: true,
        success: false,
      }));
      return;
    }

    codes.update((v) => ({
      ...v,
      output: output,
      trigger: !v.trigger,
      triggerError: !v.triggerError,
      error: false,
      success: true,
    }));
  }
};

export { run };
