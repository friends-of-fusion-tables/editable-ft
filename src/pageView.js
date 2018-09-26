"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var viewModel_1 = require("./viewModel");
var lit_html_1 = require("../node_modules/lit-html/lit-html");
var tableContent_1 = require("./tableContent");
/** Active slides out menu for small screens. See side-menu.css */
var isActive = false;
/**
 * Draw the entire page for the given ViewModel. This is efficient because lit-html re-uses
 * unchanged portions of the DOM and stamps out novel DOM portions from templates in shadow DOM.
 */
function drawPage(model) {
    var content = model.action ? actionContent(model.action) : tableContent_1.tableContent(model);
    // Outer structure from http://purecss.io/layouts/side-menu/
    lit_html_1.render(lit_html_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["<div id=\"layout\" class=", ">\n      <a href=\"#menu\" id=\"menuLink\" class=", " @click=", ">\n        <span></span>\n      </a>\n\n      <div id=\"menu\" class=", ">\n        <div class=\"pure-menu\">\n          <a class=\"pure-menu-heading\" href=\"#\">", "</a>\n\n          <ul class=\"pure-menu-list\">\n            ", "\n          </ul>\n        </div>\n      </div>\n\n      <div id=\"main\">\n        <div class=\"header\">\n          <h1>", "</h1>\n          <h2>", "</h2>\n        </div>\n\n        <div class=\"content\" @click=", ">", "</div>\n      </div>\n    </div>\n"], ["<div id=\"layout\" class=", ">\n      <a href=\"#menu\" id=\"menuLink\" class=", " @click=", ">\n        <span></span>\n      </a>\n\n      <div id=\"menu\" class=", ">\n        <div class=\"pure-menu\">\n          <a class=\"pure-menu-heading\" href=\"#\">", "</a>\n\n          <ul class=\"pure-menu-list\">\n            ",
        "\n          </ul>\n        </div>\n      </div>\n\n      <div id=\"main\">\n        <div class=\"header\">\n          <h1>", "</h1>\n          <h2>", "</h2>\n        </div>\n\n        <div class=\"content\" @click=", ">", "</div>\n      </div>\n    </div>\n"])), activeClass(""), activeClass("menu-link"), toggleActive, activeClass(""), model.heading, model.menu.map(function (m) { return lit_html_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            <li class=\"pure-menu-item\"><a href=", " class=\"pure-menu-link\">", "</a></li>\n            "], ["\n            <li class=\"pure-menu-item\"><a href=", " class=\"pure-menu-link\">", "</a></li>\n            "])), m.link, m.item); }), model.title, model.subtitle, function () { return isActive && toggleActive(); }, content), document.body);
    function toggleActive() {
        isActive = !isActive;
        exports.redrawPage();
    }
}
exports.drawPage = drawPage;
var activeClass = function (classes) { return isActive ? classes + " active" : classes; };
function actionContent(_a) {
    var text = _a.text, click = _a.click;
    return lit_html_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["<button class=\"pure-button pure-button-primary\" @click=", ">", "</button>"], ["<button class=\"pure-button pure-button-primary\" @click=", ">", "</button>"])), click, text);
}
exports.redrawPage = function () { return drawPage(viewModel_1.currentViewModel); };
var templateObject_1, templateObject_2, templateObject_3;
