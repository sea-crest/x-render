"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const xrconfig_json_1 = require("../xrconfig.json");
class Component {
    constructor(selector, options) {
        var _a;
        this.selector = selector;
        this.options = options;
        this.name = "";
        this._templateFile = "";
        this.modules = null;
        this._element = "";
        this._template = "";
        this._styles = "";
        this.isGlobal = false;
        this.data = "";
        this.isGlobal = (_a = options === null || options === void 0 ? void 0 : options.global) !== null && _a !== void 0 ? _a : true;
        this._templateFile = `${(options === null || options === void 0 ? void 0 : options.template) || `${selector}.html`}`;
        this._element = `<${xrconfig_json_1.prfeix}-${selector}></${xrconfig_json_1.prfeix}-${selector}>`;
    }
    get file() { return this._templateFile; }
    get element() { return this._element; }
    get styles() { return this._styles; }
    get html() {
        this.resolve();
        return this._template;
    }
    set values(values) {
        if (!values)
            return;
        this._template = this.evaluate(this._template, values);
    }
    resolve() {
        var _a, _b, _c, _d, _e, _f;
        this._template = (0, fs_1.readFileSync)((0, path_1.resolve)(`./${xrconfig_json_1.shipping.root}/${this.name || ((_a = this.options) === null || _a === void 0 ? void 0 : _a.name)}${((_b = this.options) === null || _b === void 0 ? void 0 : _b.index) ? "" : "/components"}/${((_c = this.options) === null || _c === void 0 ? void 0 : _c.template) || `${this.selector}.html`}`), "utf-8");
        this.data = this._template;
        if (!!((_e = (_d = this.options) === null || _d === void 0 ? void 0 : _d.modules) === null || _e === void 0 ? void 0 : _e.length)) {
            this.modules = [...this.options.modules];
            this.setModules(...this.modules);
        }
        this.resolveTemplateAndStyles();
        this.values = (_f = this.options) === null || _f === void 0 ? void 0 : _f.values;
    }
    resolveTemplateAndStyles(template = this._template) {
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
        // console.table({
        //   "Styles on top": stylesOnTop,
        //   "Template on top": templateOnTop,
        //   "Template only": templateOnly
        // });
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
                this._styles = this._styles.concat(component.styles);
                this._template = this._template.replace(new RegExp(`${component.element}`, `${this.isGlobal ? 'g' : ''}`), component._template);
            }
        });
    }
    evaluate(template, obj) {
        let res = template;
        Object.entries(obj).forEach(([key, value]) => {
            res = res.replace(new RegExp(`{${key}}`, "g"), value.toString());
        });
        return res;
    }
}
exports.Component = Component;
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
