import { convertConfig, loading } from "@/lib/store";
import { run } from "@/lib/helper/run";
import { get } from "svelte/store";
import { repeatitVersion } from "@/lib/store/versions";

const runIt = () => {
  // live update
  if (get(convertConfig).options.has("live")) {
    run();
  }
};

const loadFinish = (l: boolean) => {
  if (l) {
    return;
  }

  // banner ascii art, repeatit text mono
  console.log(
    String.raw`%cversion: ${repeatitVersion}
#   ____  _____ ____  _____    _  _____ ___ _____ 
#  |  _ \| ____|  _ \| ____|  / \|_   _|_ _|_   _|
#  | |_) |  _| | |_) |  _|   / _ \ | |  | |  | |  
#  |  _ <| |___|  __/| |___ / ___ \| |  | |  | |  
#  |_| \_|_____|_|   |_____/_/   \_|_| |___| |_|  
`, "font-family:monospace;font-size:12px;color:#00f");

  runIt();
};

loading.subscribe(loadFinish);

export { runIt };
