"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const write_json_file_1 = require("write-json-file");
// const {writeJsonFileSync} = require("write-json-file");
const config_json_1 = __importDefault(require("./config.json"));
const json = "config.json";
const xr = commander_1.program;
// xr.createCommand("module").arguments("<name>")
xr.command("module").argument("<name>").action((args) => {
    (0, write_json_file_1.writeJsonFileSync)(json, { modules: [...config_json_1.default.modules, args] });
});
xr.parse(process.argv);
// xr.action()
// console.log(xr.commands);
