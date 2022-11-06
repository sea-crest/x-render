"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
const component_1 = require("../component");
class Template extends component_1.Component {
    constructor(config) {
        super(config.selector, config.options);
        this.template = "";
        this.style = "";
    }
    get snapshot() {
        console.log(this.html);
        return;
    }
    init() {
        var _a;
        (_a = this.modules) === null || _a === void 0 ? void 0 : _a.forEach(component => {
            this.style = this.style.concat(component.styles);
        });
        this.template = this._template.split("</style>").join(`${this.style}\n</style>`);
    }
}
exports.Template = Template;
