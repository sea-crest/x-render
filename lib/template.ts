import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { Module } from "./module";
import { ComponentOptions, TemplateOptions } from "./types";
import { modules, templates } from "../xrconfig.json";

export class Template {
  static module: Module;
  private template!: string;
  
  constructor(public name: string, private options: TemplateOptions) {
    this.name = this.name.toLocaleLowerCase().replace(/\s*/g, "-");
    // this.import("document")
    
  }

  protected read(component: string): string {
    return readFileSync(resolve(
      `${modules}/`.replace("//", "/"),
      Template.module.name,
      "/components/",
      component, ".html"), "utf-8");
  }

  static write(component: string, elements: string): void {
    writeFileSync(resolve(`${modules}/`.replace("//", "/"),
    this.module.name,
    "/components/",
    component, ".html"), elements);
  }

  
}