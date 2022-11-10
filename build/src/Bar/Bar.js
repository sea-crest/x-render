"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
const module_1 = require("../../lib/module");
const BarModule = module_1.Module.create("Bar");
const Bar = lib_1.Component.createTemplate("Bar", BarModule);
const component = Bar({
    import: [new lib_1.Component("logo")],
    values: {}
});
component.shipping();
console.log("Shipping");
