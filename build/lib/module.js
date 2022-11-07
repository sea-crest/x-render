"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
const fs_1 = require("fs");
const config_json_1 = __importDefault(require("./config.json"));
const xrconfig_json_1 = require("../xrconfig.json");
const path_1 = require("path");
class Module {
    constructor(name, isDefault) {
        this.name = name;
        this.component = { index: "", self: null };
        this.templates = (0, path_1.resolve)("lib/assets/templates");
        isDefault ?
            this.templates = (0, path_1.resolve)("lib/assets/templates") :
            this.templates = `${xrconfig_json_1.modules}/${name}/`;
    }
    static create(name, isDefault) {
        if (Module.instance) {
            return Module.instance;
        }
        Module.instance = new Module(name, isDefault);
        Module.instance;
        return Module.instance;
    }
    static add(name) {
        if (Module.instances.get(name)) {
            return Module.instances.get(name);
        }
        Module.instances.set(name, new Module(name));
        return Module.instances.get(name);
    }
    static get(name) {
        Module.instances.get(name);
    }
    static register(module) {
        Module.modules = config_json_1.default.modules;
        Module.modules = [...new Set([...Module.modules, module])];
        Module.json(Object.assign(Object.assign({}, config_json_1.default), { modules: Module.modules }));
        if (!(0, fs_1.existsSync)((0, path_1.join)(xrconfig_json_1.modules))) {
            (0, fs_1.mkdirSync)((0, path_1.join)(xrconfig_json_1.modules));
        }
        (0, fs_1.mkdirSync)((0, path_1.join)(xrconfig_json_1.modules, module, "/components"), { recursive: true });
        (0, fs_1.writeFileSync)((0, path_1.join)(xrconfig_json_1.modules, "/", module, "/") + module + ".ts", `import {Component} from "../../lib";
    import { Module } from "../../lib/module";
    
    const ${module}Module = Module.create("${module}");
    
    const ${module} = Component.createTemplate("${module}", ${module}Module);
    
    const component = ${module}({
      import: [],
      values: {}
    });

    component.shipping();`);
    }
    static json(data, json = "config.json") {
        (0, fs_1.writeFileSync)(json, JSON.stringify(data));
    }
}
exports.Module = Module;
Module.instances = new Map();
Module.modules = [];
