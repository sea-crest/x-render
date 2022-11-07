"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluate = void 0;
function evaluate(template, obj) {
    let result = template;
    if (obj) {
        Object.entries(obj).forEach(([key, value]) => {
            result = result.replace(new RegExp(`{${key}}`, "g"), value.toString());
        });
    }
    return result;
}
exports.evaluate = evaluate;
