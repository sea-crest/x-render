import {Component} from "../../lib";
    import { Module } from "../../lib/module";
    
    const BarModule = Module.create("Bar");
    
    const Bar = Component.createTemplate("Bar", BarModule);
    
    const component = Bar({
      import: [new Component("logo")],
      values: {}
    });

    component.shipping({delivery: "module", name: "kek"});
    