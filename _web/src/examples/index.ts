import type { configType } from "@/lib/store";
import { hello } from "./hello";
import { planet } from "./planet";
import { tailwind } from "./tailwind";

interface IExample {
  template: string;
  input: string;
  config?: configType
}

const examples = new Map<string, IExample>();

examples.set(hello.name, hello);
examples.set(planet.name, planet);
examples.set(tailwind.name, tailwind);

export default examples;

export type { IExample };
