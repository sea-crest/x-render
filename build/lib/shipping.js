"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shipping = void 0;
const promises_1 = __importDefault(require("fs/promises"));
const fs_1 = require("fs");
const xrconfig_json_1 = require("../xrconfig.json");
const handlers_1 = require("./handlers");
function Shipping(options) {
    options.modules = [...(0, handlers_1.parseModules)(...options.modules)];
    const root = `${xrconfig_json_1.shipping.root}/${options.name}`;
    const index = (options === null || options === void 0 ? void 0 : options.indexFile) || "index.html";
    const cp = () => (0, fs_1.cpSync)(`${xrconfig_json_1.shipping.templates}/${xrconfig_json_1.shipping.indexTemplate}`, `${root}/${index}`);
    promises_1.default.mkdir(`${root}/components`).then(() => cp()).catch(err => console.log(err)).finally(() => cp());
    options.modules.forEach((component) => {
        (0, fs_1.cpSync)(`${xrconfig_json_1.shipping.templates}/${component.file}`, `${root}/components/${component.file}`);
        component.name = options.name;
        component.html;
    });
    return {
        selector: options.name,
        options: {
            root,
            name: options.name,
            template: index,
            modules: options.modules,
            values: options === null || options === void 0 ? void 0 : options.values,
        }
    };
}
exports.Shipping = Shipping;
