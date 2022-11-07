import {program} from "commander";
import { join, resolve } from "path";
import { Module } from "../module";
import { exec, spawn } from "child_process";
import xrconfig from "../../xrconfig.json";


program.command("create").argument("<name>").action((module) => Module.register(module));
program.command("start").argument("<name>").action((module) => {
  // const proc = spawn(`node build/src/${module}/${module}`).exitCode;
  exec(`node build/src/${module}/${module}`).stdio

  // proc.stdout.pipe(process.stdout);

  // process.exit(proc!);
});



program.parse(process.argv)