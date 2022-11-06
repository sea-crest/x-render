import { Template } from "./template";
import { join, normalize, resolve } from "path";
import { prfeix, templates, modules } from "../xrconfig.json";
import { Module } from "./module";
import { ComponentOptions} from "./types";
import { Shipping } from "./shipping";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";

export class Component {
  static index: string;
  static external: Component[];
  static module: Module;
  private template!: string;
  styles: string = "";
  node!: string;
  static xr: Component;
  elements = `<style>

  </style>

  <template>

  </template>`;

  get html() {
    return this.template;
  }

  set values(obj: Object) {
    this.template = this.setValues(this.template, obj);
  }

  set(values: Object) {
    this.values = values;

    return this.html;
  }


  constructor(public selector: string, public options?: ComponentOptions) {
    if (options?.index) {
      this.template = readFileSync(resolve(modules, Component.module.name, `${Component.module.component.index}.html`), "utf-8")
      this.resolve();
      this.template = this.template.replace("</style>", this.styles + "</styles>");

    } else {
      this.configure();
      this.parse();
      this.resolve();
    }
  }

  configure() {
    this.node = `<${prfeix}-${this.selector}></${prfeix}-${this.selector}>`;
    Shipping.template(this.selector, Component.module);
    this.elements = Component.read(this.selector);
  }

  parse() {
    const style = "<style>";
    const template = "<template>";

    if (this.elements.includes(style) && this.elements.replace(style, "").includes(style)) {
      throw new Error("Component has more then one <style> element");
    }

    if (this.elements.includes(template) && this.elements.replace(template, "").includes(template)) {
      throw new Error("Component has more then one <template> element");
    }

    const stylesTop = this.elements.split(/<\/style>\s*<template>/)[0];
    const templateBottom = this.elements.split(/<\/style>\s*<template>/)[1];

    const templateTop = this.elements.split(/<\/template>\s*<style>/)[0];
    const stylesBottom = this.elements.split(/<\/template>\s*<style>/)[1];

    const templateContainerStart = this.elements.split(/<template>/)[0];
    const templateContainerEnd = this.elements.split(/<template>/)[1];

    const index = !this.elements.includes("<template>");

    const templateOnly = !this.elements.includes("<style") && templateContainerStart !== this.elements && templateContainerEnd.endsWith("</template>");
    
    const stylesThenTemplate = stylesTop !== this.elements && stylesTop.includes("<style>") && !stylesTop.includes("</template>") && templateBottom.includes("</template>");

    const templateThenStyles = templateTop !== this.elements && templateTop.includes("<template>") && !templateTop.includes("</style>") && stylesBottom.includes("</style>");

    if (index) {
      if (!this.elements.includes("<style")) {
        return;
      }
    }

    if (templateOnly) {
      this.styles = "";
      this.template = templateContainerEnd.replace("</template>", "").trim();
    }

    if (stylesThenTemplate) {
      this.styles = stylesTop.replace("<style>", "").trim();
      this.template = templateBottom.replace("</template>", "").trim();
    } else if (templateThenStyles) {
      this.template = templateTop.replace("<template>", "").trim();
      this.styles = stylesBottom.replace("</style>", "").trim();
    }
  }

  resolve() {
    if (!this.options?.import) return;
    this.options.import.forEach((component) => {
      if (!this.template.includes(component.node)) {
        console.error(`Component requires >> ${component.node} element`);
      } else {
        if (!this.styles.includes(component.styles)) {
          this.styles += '\n' + component.styles;
        }
        this.template = this.template.replace(new RegExp(component.node, 'g'), component.template);
      }
    });

    if (this.options?.values && !!Object.entries(this.options.values).length) {
      this.values = this.options.values;
    }

    if (this.template.includes(`<${prfeix}-`)) {
      console.error("Component contains some of elements has not been imported as components\n")
    }
  }


  static createTemplate(name: string, module: Module) {
    Component.module = module;
    
    this.index = name.toLowerCase().replace(/\W/g, "-")
    const indexhtml = this.index + ".html";

    module.component.index = this.index;

    if (existsSync(join(modules + "/" + module.name + "/" + indexhtml))) {
      return this.build;
    }
    
    writeFileSync(resolve(modules, module.name, indexhtml), this.import("document"));
    return this.build;
  }

  static build(options?: {
    import: Component[],
    values?: Object,
  }) {
    const xr = new Component(Component.module.component.index, {...options, index: true});
    
    Component.module.component.self = xr;
    return xr;
  }

  setValues(template: string, values: Object): string {
    let res = template;
    
    Object.entries(values).forEach(([key, value]) => {
      res = res.replace(new RegExp(`{${key}}`, "g"), value.toString())
    })
  
    return res;
  }

  shipping(opts?: {delivery?: "module" | "templates", name?: string}) {
    const self = Component.module.component.self!;
    const file  = ((opts?.name && opts?.name +".xr.html") || Component.module.component.index + ".xr.html");
    if (opts?.delivery === "module") {
      Shipping.export(join(modules, Component.module.name, file), self.html);
      return;
    }

    const templates = resolve("templates");
    !existsSync(templates) && mkdirSync(templates);
    Shipping.export(join(templates, file), self.html);
  }

  static import(template: "document" | "logo" | "blank") {
    return readFileSync(resolve(templates + `/${template}.html`), "utf8");
  }

  static read(component: string): string {
    return readFileSync(resolve(modules, this.module.name, "components", component + ".html"), "utf-8");
  }

  static write(component: string, elements: string): void {
    writeFileSync(resolve(modules, this.module.name, "components", component + ".html"), elements);
  }
}