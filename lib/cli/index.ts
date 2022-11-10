import {program} from "commander";
import { join, resolve } from "path";
import { Module } from "../module";
import { execSync } from "child_process";


program.command("create").argument("<name>").action((module) => Module.register(module));
program.command("start").argument("<name>").action((module) => {
  execSync(`ts-node ./src/${module}/${module}`, {stdio: "inherit"})
});



program.parse(process.argv)