import arg from "arg";

import Compiler from "./Compiler";

const args = arg({ "--import-dir": [String], "-I": "--import-dir" });
if (args._.length !== 1) throw new Error("Expected one source file");

const compiler = new Compiler();

for (const path of args["--import-dir"] ?? []) compiler.addImportDir(path);

compiler.compile(args._[0]);
console.log(compiler.glob);
