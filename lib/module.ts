import { cpSync, existsSync, mkdirSync, readdirSync, readFile, readFileSync, writeFileSync } from "fs";
import fsp, { readdir } from "fs/promises";
import fs from "fs";

import config from "./config.json";
import {modules} from "../xrconfig.json"
import { Component } from "./component";
import { Shipping } from "./shipping";
import { join, normalize, resolve } from "path";

export class Module {
  component: {
    index: string,
    self: Component | null
  } = {index: "", self: null}
  private static instance: Module;
  private static instances: Map<string, Module> = new Map();
  static modules: string[] = [];

  templates = resolve("lib/assets/templates");
  
  private constructor(public name: string, isDefault?: boolean) {
    isDefault ?
      this.templates = resolve("lib/assets/templates") :
      this.templates = `${modules}/${name}/`;
  }

  static create(name: string, isDefault?: boolean) {
    if (Module.instance) {
      return Module.instance;
    }

    Module.instance = new Module(name, isDefault);
    Module.instance

    return Module.instance;
  }
  
  static add(name: string) {
    if (Module.instances.get(name)) {
      return Module.instances.get(name);
    }
    
    Module.instances.set(name, new Module(name));
    return Module.instances.get(name);
  }

  static get(name: string) {
    Module.instances.get(name);
  }

  static register(module: string) {
    Module.modules = config.modules;
    Module.modules = [...new Set<string>([...Module.modules, module])];
    Module.json({...config, modules: Module.modules});

    if (!existsSync(join(modules))) {
      mkdirSync(join(modules));  
    }

    mkdirSync(join(modules, module, "/components"), {recursive: true})
    
    writeFileSync(join(modules, "/", module, "/") + module + ".ts", `import {Component} from "../../lib";
    import { Module } from "../../lib/module";
    
    const ${module}Module = Module.create("${module}");
    
    const ${module} = Component.createTemplate("${module}", ${module}Module);
    
    const component = ${module}({
      import: [],
      values: {}
    });

    component.shipping();`);
    
  }

  static json(data: any, json = "config.json") {
    writeFileSync(json, JSON.stringify(data));
  }
}