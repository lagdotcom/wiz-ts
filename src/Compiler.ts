import { existsSync, readFileSync } from "fs";
import { dirname, join } from "path";

import SyntaxEvaluator, {
  FuncStatement,
  InStatement,
  NamespaceStatement,
  Statement,
} from "./AST";
import Tokenizer from "./Tokenizer";

class Env {
  dir: Map<string, Env>;

  constructor(
    public parent?: Env,
    public statement?: FuncStatement | NamespaceStatement,
    public location?: InStatement,
  ) {
    this.dir = new Map();
  }

  get name() {
    if (!this.statement) return "global scope";
    return `${this.statement.type} ${this.statement.name}`;
  }

  add(name: string, value: Env) {
    if (this.dir.has(name))
      throw new Error(`${this.name} already has entry "${name}"`);

    this.dir.set(name, value);
  }
}

export default class Compiler {
  compiled: Set<string>;
  importDirs: Set<string>;
  glob: Env;

  constructor() {
    this.compiled = new Set();
    this.glob = new Env();
    this.importDirs = new Set();
  }

  addImportDir(path: string) {
    this.importDirs.add(path);
  }

  compile(filename: string, env = this.glob) {
    if (this.compiled.has(filename)) return;
    this.compiled.add(filename);

    console.log("Compiling:", filename);
    const src = readFileSync(filename, { encoding: "utf-8" });
    const tokenizer = new Tokenizer(filename, src);

    const tokens = [...tokenizer.evaluate()];
    const ast = new SyntaxEvaluator(filename, tokens);
    for (const stmt of ast.evaluate()) this.evaluate(filename, stmt, env);
  }

  import(filename: string, fromFilename: string, env: Env) {
    this.addImportDir(dirname(fromFilename));

    for (const path of this.importDirs) {
      const fullFilename = join(path, filename + ".wiz");
      if (existsSync(fullFilename)) {
        this.compile(fullFilename, env);
        return;
      }
    }

    console.log("paths:", this.importDirs);
    throw new Error(`Could not find import "${filename}" from ${fromFilename}`);
  }

  evaluate(filename: string, stmt: Statement, env: Env, loc?: InStatement) {
    // console.log(stmt);

    switch (stmt.type) {
      case "func":
      case "namespace": {
        const subEnv = new Env(env, stmt, loc);
        env.add(stmt.name, subEnv);
        break;
      }

      case "import":
        this.import(stmt.value, filename, env);
        break;

      case "in":
        for (const line of stmt.contents)
          this.evaluate(filename, line, env, stmt);
        break;
    }
  }
}
