"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
const handlers_1 = require("./lib/handlers");
class Component {
    constructor(options) {
        this.options = options;
        this._template = "";
        this._element = "";
        this._values = {};
        const { selector } = this.options;
        // this._template = template;
        if (this.options.children) {
            this._template = this.resolveChildren(this.template, ...this.options.children);
        }
    }
    get template() {
        return this._template;
    }
    get element() {
        return this._element;
    }
    set values(val) {
        this._values = Object.assign({}, val);
    }
    // create(options: {selector: string, template?: string, values?: ComponentValues, children?: Component[]}) {
    //   const {selector} = this.options;
    //   if (!this.options.template) {
    //     this.options.template = `${selector}.html`;
    //   }
    //   this._element = `<${config.prfeix}-${selector}></${config.prfeix}-${selector}>`;
    //   const templateFile = this.options.template;
    //   let template = readFileSync(resolve(`./templates/${templateFile}`), "utf-8");
    //   if (this.options.values) {
    //     template = this.resolveValues(template, this.options.values)
    //   }
    //   this._template = template;
    //   if (this.options.children) {
    //     this._template = this.resolveChildren(this.template, ...this.options.children);
    //   }
    // }
    resolveValues(str, values) {
        return (0, handlers_1.evaluate)(str, values);
    }
    resolveTemplate(template) {
        let styles = "";
        if (template.includes("<template>")) {
            const slice = template.split("<template>");
            if (slice[0].includes("<style>")) {
                styles = slice[0].replace("</style>", "");
                styles = styles.replace("<style>", "");
                template = slice[1].replace("</template>", "");
            }
            else {
                console.error("Style emlement has to be on top of template");
            }
        }
        else {
            console.error("Template has to contain <template> element");
        }
        return { template, styles };
    }
    resolveChildren(template, ...children) {
        let result = template;
        children.forEach(component => {
            result = result.replace(new RegExp(`${component.element}`, 'g'), component.template);
        });
        return result;
    }
}
exports.Component = Component;
