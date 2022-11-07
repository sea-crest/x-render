"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
const path_1 = require("path");
const xrconfig_json_1 = require("../xrconfig.json");
const shipping_1 = require("./shipping");
const fs_1 = require("fs");
class Component {
    constructor(selector, options) {
        this.selector = selector;
        this.options = options;
        this.styles = "";
        this.elements = `<style>

  </style>

  <template>

  </template>`;
        if (options === null || options === void 0 ? void 0 : options.index) {
            this.template = (0, fs_1.readFileSync)((0, path_1.resolve)(xrconfig_json_1.modules, Component.module.name, `${Component.module.component.index}.html`), "utf-8");
            this.resolve();
            this.template = this.template.replace("</style>", this.styles + "</styles>");
        }
        else {
            this.configure();
            this.parse();
            this.resolve();
        }
    }
    get html() {
        return this.template;
    }
    set values(obj) {
        this.template = this.setValues(this.template, obj);
    }
    set(values) {
        this.values = values;
        return this.html;
    }
    configure() {
        this.node = `<${xrconfig_json_1.prfeix}-${this.selector}></${xrconfig_json_1.prfeix}-${this.selector}>`;
        shipping_1.Shipping.template(this.selector, Component.module);
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
        }
        else if (templateThenStyles) {
            this.template = templateTop.replace("<template>", "").trim();
            this.styles = stylesBottom.replace("</style>", "").trim();
        }
    }
    resolve() {
        var _a, _b;
        if (!((_a = this.options) === null || _a === void 0 ? void 0 : _a.import))
            return;
        this.options.import.forEach((component) => {
            if (!this.template.includes(component.node)) {
                console.error(`Component requires >> ${component.node} element`);
            }
            else {
                if (!this.styles.includes(component.styles)) {
                    this.styles += '\n' + component.styles;
                }
                this.template = this.template.replace(new RegExp(component.node, 'g'), component.template);
            }
        });
        if (((_b = this.options) === null || _b === void 0 ? void 0 : _b.values) && !!Object.entries(this.options.values).length) {
            this.values = this.options.values;
        }
        if (this.template.includes(`<${xrconfig_json_1.prfeix}-`)) {
            console.error("Component contains some of elements has not been imported as components\n");
        }
    }
    static createTemplate(name, module) {
        Component.module = module;
        this.index = name.toLowerCase().replace(/\W/g, "-");
        const indexhtml = this.index + ".html";
        module.component.index = this.index;
        if ((0, fs_1.existsSync)((0, path_1.join)(xrconfig_json_1.modules + "/" + module.name + "/" + indexhtml))) {
            return this.build;
        }
        (0, fs_1.writeFileSync)((0, path_1.resolve)(xrconfig_json_1.modules, module.name, indexhtml), this.import("document"));
        return this.build;
    }
    static build(options) {
        const xr = new Component(Component.module.component.index, Object.assign(Object.assign({}, options), { index: true }));
        Component.module.component.self = xr;
        return xr;
    }
    setValues(template, values) {
        let res = template;
        Object.entries(values).forEach(([key, value]) => {
            res = res.replace(new RegExp(`{${key}}`, "g"), value.toString());
        });
        return res;
    }
    shipping(opts) {
        const self = Component.module.component.self;
        const file = (((opts === null || opts === void 0 ? void 0 : opts.name) && (opts === null || opts === void 0 ? void 0 : opts.name) + ".xr.html") || Component.module.component.index + ".xr.html");
        if ((opts === null || opts === void 0 ? void 0 : opts.target) === "module") {
            shipping_1.Shipping.export((0, path_1.join)(xrconfig_json_1.modules, Component.module.name, file), self.html);
            return;
        }
        const templates = (0, path_1.resolve)("templates");
        !(0, fs_1.existsSync)(templates) && (0, fs_1.mkdirSync)(templates);
        shipping_1.Shipping.export((0, path_1.join)(templates, file), self.html);
    }
    static import(template) {
        return (0, fs_1.readFileSync)((0, path_1.resolve)(xrconfig_json_1.templates + `/${template}.html`), "utf8");
    }
    static read(component) {
        return (0, fs_1.readFileSync)((0, path_1.resolve)(xrconfig_json_1.modules, this.module.name, "components", component + ".html"), "utf-8");
    }
    static write(component, elements) {
        (0, fs_1.writeFileSync)((0, path_1.resolve)(xrconfig_json_1.modules, this.module.name, "components", component + ".html"), elements);
    }
}
exports.Component = Component;
