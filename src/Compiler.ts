import { readFileSync } from "fs";

import SyntaxEvaluator from "./AST";
import Tokenizer from "./Tokenizer";

export default class Compiler {
  compile(filename: string) {
    const src = readFileSync(filename, { encoding: "utf-8" });
    const tokenizer = new Tokenizer(filename, src);

    const tokens = [...tokenizer.evaluate()];
    const ast = new SyntaxEvaluator(filename, tokens);
    for (const stmt of ast.evaluate()) {
      console.log(stmt);
    }
  }
}
