"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Module = void 0;
function Module() {
    return (target, propertyKey, descriptor) => {
        return descriptor;
    };
}
exports.Module = Module;
