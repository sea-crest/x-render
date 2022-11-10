"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const xrconfig_json_1 = require("../xrconfig.json");
class Template {
    constructor(name, options) {
        this.name = name;
        this.options = options;
        this.name = this.name.toLocaleLowerCase().replace(/\s*/g, "-");
        // this.import("document")
    }
    read(component) {
        return (0, fs_1.readFileSync)((0, path_1.resolve)(`${xrconfig_json_1.modules}/`.replace("//", "/"), Template.module.name, "/components/", component, ".html"), "utf-8");
    }
    static write(component, elements) {
        (0, fs_1.writeFileSync)((0, path_1.resolve)(`${xrconfig_json_1.modules}/`.replace("//", "/"), this.module.name, "/components/", component, ".html"), elements);
    }
}
exports.Template = Template;
