import type { configType } from "@/lib/store";
import { hello } from "./1-hello";
import { forE } from "./2-for";
import { planet } from "./3-planet";
import { tailwind } from "./4-tailwind";

interface IExample {
  name?: string;
  template: string;
  input: string;
  config?: configType
}

const examples = new Map<string, IExample>();

const exampleList = [hello, forE, planet, tailwind];
exampleList.forEach((example, index) => {
  examples.set(`${index + 1}- ${example.name}`, example);
});

export default examples;

export type { IExample };
