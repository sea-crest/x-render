"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluate = void 0;
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
// export function getHTMLFile(filename: string, ext: string) { 
//   const build =`${BUILD}${filename}.${ext}`.replace("//", "/");
//   const src = `${SRC}${filename}/${filename}.${ext}`.replace("//", "/");
//   const file = fs.readFileSync(src, "utf-8");
//   fs.writeFileSync(build, file);
//   return fs.readFileSync(build, "utf-8")
// }
