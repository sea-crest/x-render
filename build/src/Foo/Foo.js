"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("../../lib");
const module_1 = require("../../lib/module");
const FooModule = module_1.Module.create("Foo");
const Foo = lib_1.Component.createTemplate("Foo", FooModule);
const component = Foo({
    import: [new lib_1.Component("logo")],
    values: {}
});
