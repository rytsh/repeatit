import { codes, convertConfig } from "@/lib/store";
import { get } from "svelte/store";

import update from "immutability-helper";

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
      codes.update((v) => update(v, {
        output: { $set: error.toString() },
        trigger: { $set: !v.trigger },
        triggerError: { $set: !v.triggerError },
        error: { $set: true },
        success: { $set: false },
      }));
      return;
    }

    codes.update((v) => update(v, {
      output: { $set: output },
      trigger: { $set: !v.trigger },
      triggerError: { $set: !v.triggerError },
      error: { $set: false },
      success: { $set: true },
    }));
  }
};

export { run };
