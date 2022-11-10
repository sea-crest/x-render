"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.document = exports.logo = void 0;
const component_1 = require("../../component");
const logo = new component_1.Component("logo", { useDefaultModule: true });
exports.logo = logo;
const document = new component_1.Component("layout", {
    useDefaultModule: true,
    index: true
});
exports.document = document;
