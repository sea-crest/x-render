import {Component} from "../../lib";
import { Module } from "../../lib/module";

const FooModule = Module.create("Foo");

const Foo = Component.createTemplate("foo", FooModule);

Foo({
  import: [],
  values: {}
})