"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseModules = exports.evaluate = void 0;
const component_1 = require("./component");
// const LIB = `${process.cwd()}/${lib}/`.replace("//", "/");
// const BUILD = `${process.cwd()}/${build}/`.replace("//", "/");
// const SRC = `${process.cwd()}/${src}/`.replace("//", "/");
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
function parseModules(...modules) {
    const parsedModules = [];
    modules.forEach(m => {
        if (typeof m === "string") {
            parsedModules.push(new component_1.Component(m));
        }
        else if (m instanceof Array) {
            const [selector, options] = m;
            parsedModules.push(new component_1.Component(selector, options));
        }
        else if (m instanceof component_1.Component) {
            parsedModules.push(m);
        }
        else {
            throw new Error("Unable to parse modules");
        }
    });
    return parsedModules;
}
exports.parseModules = parseModules;
// export function getHTMLFile(filename: string, ext: string) { 
//   const build =`${BUILD}${filename}.${ext}`.replace("//", "/");
//   const src = `${SRC}${filename}/${filename}.${ext}`.replace("//", "/");
//   const file = fs.readFileSync(src, "utf-8");
//   fs.writeFileSync(build, file);
//   return fs.readFileSync(build, "utf-8")
// }
