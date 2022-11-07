"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XRComponents = exports.ModuleOptions = exports.ComponentOptions = exports.TemplateOptions = void 0;
class ComponentOptions {
}
exports.ComponentOptions = ComponentOptions;
class TemplateOptions {
}
exports.TemplateOptions = TemplateOptions;
class ModuleOptions {
    constructor() {
        this.index = this.name.toLowerCase().replace(/\s*/g, "-");
        // import?: string[] | () =>;
    }
}
exports.ModuleOptions = ModuleOptions;
var XRComponents;
(function (XRComponents) {
    XRComponents[XRComponents["document"] = 0] = "document";
    XRComponents[XRComponents["logo"] = 1] = "logo";
})(XRComponents || (XRComponents = {}));
exports.XRComponents = XRComponents;
