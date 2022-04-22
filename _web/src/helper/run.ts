import { codes, convertConfig } from "@/store";
import { get } from "svelte/store";

import update from "immutability-helper";

const run = async () => {
  const values = get(codes);
  const config = get(convertConfig);

  const render = window["render"];
  if (render) {
    let output: string;
    try {
      output = await render(values.input == "" ? "null" : values.input, values.template, config.template, [...config.functions.keys()].join(","));
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
