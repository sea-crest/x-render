"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shipping = void 0;
const xrconfig_json_1 = require("../xrconfig.json");
const fs_1 = require("fs");
const path_1 = require("path");
const component_1 = require("./component");
class Shipping {
    static template(name, module, index) {
        const from = (0, path_1.resolve)(xrconfig_json_1.templates, name + ".html");
        const to = (0, path_1.resolve)(xrconfig_json_1.modules, module.name, "components", name + ".html");
        if ((0, fs_1.existsSync)(to)) {
            return;
        }
        if (!(0, fs_1.existsSync)(from)) {
            (0, fs_1.writeFileSync)(to, component_1.Component.import("blank"));
            return;
        }
        const html = (0, fs_1.readFileSync)(from, "utf-8");
        (0, fs_1.writeFileSync)(to, html);
    }
    static export(path, html) {
        (0, fs_1.writeFileSync)(path, html);
    }
}
exports.Shipping = Shipping;
