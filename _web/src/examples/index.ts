import { hello } from "./hello";
import { planet } from "./planet";

interface IExample {
  template: string;
  input: string;
}

const convert = (v: { template: string, input: string }) => {
  return {
    template: v.template,
    input: v.input,
  } as IExample;
};

const examples = new Map<string, IExample>();

examples.set(hello.name, convert(hello));
examples.set(planet.name, convert(planet));

export default examples;

export type { IExample };
