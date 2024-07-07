import arg from "arg";

import Compiler from "./Compiler";

const args = arg({});
if (args._.length !== 1) throw new Error("Expected one source file");

const compiler = new Compiler();
compiler.compile(args._[0]);
