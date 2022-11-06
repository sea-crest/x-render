import { Component } from "./component";
import { Module } from "./module";

class ComponentOptions {
  import?: Component[];
  values?: Object;
  file?: string;
  root?: string;
  index?: boolean;
  useDefaultModule?: boolean;
  module?: Module;
}

export class TemplateOptions {
  module!: Module;
  import!: Component[];
  values?: Object;
}

class ModuleOptions {
  name!: string;
  values?: Object;
  index: string = this.name.toLowerCase().replace(/\s*/g, "-");
  // import?: string[] | () =>;
}

interface TemplatesOptions {
  module: Module;
  values?: Object;
  // import?: 
}

enum XRComponents {
  document,
  logo
}

export {ComponentOptions, ModuleOptions, XRComponents}