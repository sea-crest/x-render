import { resolve } from "path";
import { Component } from "../../component";
import { Module } from "../../module";
import { Template } from "../../template";

const logo = new Component("logo", {useDefaultModule: true});
const document = new Component("layout", {
  useDefaultModule: true,
  index: true
});

export {
  logo,
  document
}