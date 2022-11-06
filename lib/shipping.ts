import { Module } from "./module";
import {templates, modules} from "../xrconfig.json"
import { readFileSync, existsSync, writeFileSync } from "fs";
import { join, resolve } from "path";
import { Component } from "./component";

export class Shipping {
  static template(name: string, module: Module, index?: boolean): void {
    const from = resolve(templates, name + ".html");
    const to = resolve(modules, module.name, "components", name + ".html");

    if (existsSync(to)) {
      return;
    }
    
    if (!existsSync(from)) {
      writeFileSync(to, Component.import("blank"));
      return;
    }

    const html = readFileSync(from, "utf-8");
    writeFileSync(to, html);
  }

  static export(path: string, html: string) {
    writeFileSync(path, html);
  }

  
}