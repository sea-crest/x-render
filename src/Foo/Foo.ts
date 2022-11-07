import {Component} from "../../lib";
    import { Module } from "../../lib/module";
    
    const FooModule = Module.create("Foo");
    
    const Foo = Component.createTemplate("Foo", FooModule);
    
    const component = Foo({
      import: [new Component("logo")],
      values: {}
    });
