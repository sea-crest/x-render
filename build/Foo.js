"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
const shippingConfig = (0, lib_1.Shipping)({
    name: "Foo",
    modules: [new lib_1.Component("logo")]
});
// const Foo = new Template(shippingConfig);
