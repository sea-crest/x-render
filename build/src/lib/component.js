"use strict";
// import {evaluate, loadFile } from "./handlers";
// import { ComponentValues, FactoryOptions, InitComponent, Options } from "./types";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const xrconfig_json_1 = require("../../xrconfig.json");
// export function createComponentFromMJML(template: string) {
//   return "";
// }
// function Component() {
//   return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
//   }
// }
// export function Template(options?: Options) {
//   let template = "";
//   if (options?.files) {
//     if (options.files.template) {
//       template = loadFile(options.files.template, "mjml");
//     }
//     if (options.files.cssFile) {
//       cssFile = loadFile(options.files.cssFile, "css");
//     }
//   }
//   if (cssFile && template) {
//     template = template.replace("{styles}", cssFile)
//   }
//   return (target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
//     const method = descriptor.value;
//     descriptor.value = function (values: any) {
//       let mjmlTemplate = createComponentFromMJML((method as Function).call(target, values));
//       if (mjmlTemplate || template) {
//         mjmlTemplate = options?.template?.top ? 
//           mjmlTemplate.concat(evaluate(template, values)) : evaluate(template, values).concat(mjmlTemplate);
//         if (options?.template?.filePlaceholder) {
//           try {
//             const split = mjmlTemplate.split(options.template.filePlaceholder);
//             if (split.length < 2 || split.length > 2) {
//               throw new Error("Cannot be inserted");
//             } else {
//               mjmlTemplate = split[0].concat(template).concat(split[1]);
//             }
//           } catch (err) {
//             console.error(err);
//           }
//         }
//       } else {
//         console.error(new Error("Any template have not been provided"))
//       }
//       return mjmlTemplate;
//     }
//     return descriptor;
//   }
// }
class Component {
    constructor(selector, options) {
        var _a;
        this.selector = selector;
        this._element = "";
        this._values = null;
        this._template = "";
        this._styles = "";
        this._modules = null;
        this._values = options === null || options === void 0 ? void 0 : options.values;
        if (!!((_a = options === null || options === void 0 ? void 0 : options.modules) === null || _a === void 0 ? void 0 : _a.length)) {
            this._modules = [...options.modules];
        }
        this._element = `<${xrconfig_json_1.prfeix}-${selector}></${xrconfig_json_1.prfeix}-${selector}>`;
        this._template = (0, fs_1.readFileSync)((0, path_1.resolve)(`./templates/${(options === null || options === void 0 ? void 0 : options.template) || `${selector}.html`}`), "utf-8");
        this.parseTemplateAndStyles(this._template);
        if (this._modules) {
            this.setModules(...this._modules);
        }
        if (this._values) {
            this._template = this.evaluate(this._template, this._values);
        }
    }
    get element() { return this._element; }
    get template() { return this._template; }
    get styles() { return this._styles; }
    set values(values) {
        this._values = values;
    }
    parseTemplateAndStyles(template = this.template) {
        const styleThenTemplate = /<style>(\s.*?)+<\/style>(\s.*?)<template>(\s.*?)+<\/template>/gm.test(template);
        console.log(styleThenTemplate);
        // /<style>(\s.*?)+<\/style>(\s.*?)<template>(\s.*?)+<\/template>/gm.test(template);
        // console.log(/<style>(\s.*?)+<\/style>(\s.*?)<template>(\s.*?)+<\/template>$/gm.test(template));
        // ---------
        const splittedContentStylesOnTop = template.split(/<\/style>\s*<template>/);
        const splittedContentTemplateOnTop = template.split(/<\/template>\s*<style>/);
        const splittedContentTemplateCheck = template.split(/<template>/);
        const templateOnly = (!template.includes("<style>") || !template.includes("</style>")) &&
            splittedContentTemplateCheck[0] !== template && splittedContentTemplateCheck[1].endsWith("</template>");
        const stylesOnTop = splittedContentStylesOnTop[0] !== template &&
            splittedContentStylesOnTop[0].includes("<style>") && !splittedContentStylesOnTop[0].includes("</template>") &&
            splittedContentStylesOnTop[1].includes("</template>");
        const templateOnTop = splittedContentTemplateOnTop[0] !== template &&
            splittedContentTemplateOnTop[0].includes("<template>") && !splittedContentTemplateOnTop[0].includes("</style>") &&
            splittedContentTemplateOnTop[1].includes("</style>");
        console.table({
            "Styles on top": stylesOnTop,
            "Template on top": templateOnTop,
            "Template only": templateOnly
        });
        if (templateOnly) {
            this._template = splittedContentTemplateCheck[1].replace("</template>", "").trim();
        }
        if (stylesOnTop) {
            this._styles = splittedContentStylesOnTop[0].replace("<style>", "").trim();
            this._template = splittedContentStylesOnTop[1].replace("</template>", "").trim();
        }
        else if (templateOnTop) {
            this._template = splittedContentTemplateOnTop[0].replace("<template>", "").trim();
            this._styles = splittedContentTemplateOnTop[1].replace("</style>", "").trim();
        }
        return { styles: this._styles, template: this._template };
    }
    setModules(...components) {
        components.forEach(component => {
            if (!this._template.includes(component.element)) {
                throw new Error(`Template is expecting element ${component.element}\n`);
            }
            else {
                this._styles = this._styles.concat(`\n${component.styles}`);
                this._template = this._template.replace(new RegExp(`${component.element}`, 'g'), component.template);
            }
        });
    }
    evaluate(template, obj) {
        let result = template;
        Object.entries(obj).forEach(([key, value]) => {
            result = result.replace(new RegExp(`{${key}}`, "g"), value.toString());
        });
        return result;
    }
}
exports.Component = Component;
const Logo = new Component("logo");
// const Layout = new Component("layout", {
//   values: {title: "Layout"},
//   modules: [Logo]
// });
// console.log(Logo.template);
