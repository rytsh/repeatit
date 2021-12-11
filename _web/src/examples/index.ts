import { hello } from "./hello";

interface IExample {
  template: string;
  input: string;
}

const convert = (v: {template: string, input: object}) => {
  return {
    template: v.template,
    input: JSON.stringify(v.input, null, 2),
  } as IExample;
};

const examples = new Map<string, IExample>();

examples.set(hello.name, convert(hello));

export default examples;
