import {applyComponents, Component} from "../../lib";
import { Module } from "../../lib/module";

const ReferalModule = Module.create("Referal");

const Referal = Component.createTemplate("Referal", ReferalModule);

const document = Referal({
  import: [ ...applyComponents("text-box", "bg-box", "bt-link", "logo", "footer") ],
  values: {}
});

document.shipping();