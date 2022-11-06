"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = void 0;
const component_1 = require("../lib/component");
class Layout extends component_1.Component {
    constructor(title, options, modules = []) {
        var _a;
        const values = Object.assign(Object.assign({}, ((_a = options === null || options === void 0 ? void 0 : options.values) !== null && _a !== void 0 ? _a : {})), { title });
        super(title, Object.assign(Object.assign({}, options), { template: "layout.html", values, modules: [...modules] }));
        this.style = "";
        this.style = this.template.split("</style>")[0].split(/<style.*>/)[1].trim();
        // console.log(this.);
    }
    setStyles(template, styles) {
        return template.split("</style>").join(`${styles}\n</style>`);
    }
}
exports.Layout = Layout;
const Foo = new Layout("foo");
