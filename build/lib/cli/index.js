"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const module_1 = require("../module");
const child_process_1 = require("child_process");
commander_1.program.command("create").argument("<name>").action((module) => module_1.Module.register(module));
commander_1.program.command("start").argument("<name>").action((module) => {
    // const proc = spawn(`node build/src/${module}/${module}`).exitCode;
    // exec(`node build/src/${module}/${module}`)
    (0, child_process_1.execSync)(`node build/src/${module}/${module}`, { stdio: "inherit" });
    // proc.stdout.pipe(process.stdout);
    // process.exit(proc!);
});
commander_1.program.parse(process.argv);
