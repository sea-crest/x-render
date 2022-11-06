import {program} from "commander";
import { Module } from "../module";

program.command("create").argument("<name>").action((module) => Module.register(module));
program.command("start").argument("<name>").action((module) => {
  
});



program.parse(process.argv)