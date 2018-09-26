"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var lit_html_1 = require("../node_modules/lit-html/lit-html");
var pageSpec_1 = require("./pageSpec");
var pageView_1 = require("./pageView");
/**
 * For viewing, there is no keydown handler and the cell text is rewritten so that doc IDs become
 * clickable links.
 */
var VIEWED_CELL_HANDLER = {
    editable: false, keydown: function () { }, render: function (value) {
        var m = /^(.*)\b([01][\w-]{34,42})\b(.*)$/.exec(value);
        return m ? lit_html_1.html(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", "<a href=", ">", "</a>", ""], ["", "<a href=", ">", "</a>", ""])), m[1], pageSpec_1.hash({ tableId: m[2] }), m[2], m[3]) : value;
    }
};
/** The index of the edited row. -1 means no row is in edit mode. */
var edited = -1;
/**
 * Returns CellHandler for the given ViewModel. Cell values are rendered literally. Escape key exits
 * edit mode. Enter key, writes cell text content back to model and calls onRowChanged.
 */
function editedCellHandler(_a) {
    var tableBody = _a.tableBody, onRowChanged = _a.onRowChanged;
    return { editable: true, keydown: keydown, render: function (c) { return c; } };
    function keydown(e) {
        if (e.code == 'Escape') {
            edited = -1;
            pageView_1.redrawPage();
        }
        else if (e.code == 'Enter') {
            var targetCell = e.target;
            var cellElements = targetCell.closest('tr').cells;
            var modelRow = tableBody[edited];
            for (var i = cellElements.length; --i >= 0;) {
                modelRow[i] = cellElements.item(i).textContent;
            }
            if (onRowChanged)
                onRowChanged(edited);
            edited = -1;
            pageView_1.redrawPage();
        }
    }
}
/**
 * Returns TemplateResult for an HTML table for the given ViewModel and current PageSpec. It is
 * intended for the content element of the side-menu layout. Header row has menu on hover for column
 * actions, presently just ordering.
 */
function tableContent(model) {
    return lit_html_1.html(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    <table class=\"pure-table pure-table-bordered\">\n\t   <thead>\n       <tr>", "</tr>\n\t   </thead>\n     <tbody>\n       ", "\n     </tbody>\n    </table>"], ["\n    <table class=\"pure-table pure-table-bordered\">\n\t   <thead>\n       <tr>", "</tr>\n\t   </thead>\n     <tbody>\n       ", "\n     </tbody>\n    </table>"])), model.tableHead.map(headerCell), model.tableBody.map(tableRow));
    function headerCell(text) {
        var orderBy = function (dir) { return pageSpec_1.hash(__assign({}, pageSpec_1.currentPageSpec, { orderBy: "'" + text + "' " + dir })); };
        var orderClass = pageSpec_1.currentPageSpec.tableId ? ['pure-menu-item'] : ['hidden'];
        return lit_html_1.html(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n<td class=\"pure-menu-item pure-menu-has-children pure-menu-allow-hover\">\n  <span class=\"pure-menu-link\">", "</span>\n\t<ul class=\"pure-menu-children\">\n\t  <li class=", "><a href=", " class=\"pure-menu-link\">Order A->Z</a></li>\n\t  <li class=", "><a href=", " class=\"pure-menu-link\">Order Z->A</a></li>\n\t</ul>\n</td>"], ["\n<td class=\"pure-menu-item pure-menu-has-children pure-menu-allow-hover\">\n  <span class=\"pure-menu-link\">", "</span>\n\t<ul class=\"pure-menu-children\">\n\t  <li class=", "><a href=", " class=\"pure-menu-link\">Order A->Z</a></li>\n\t  <li class=", "><a href=", " class=\"pure-menu-link\">Order Z->A</a></li>\n\t</ul>\n</td>"])), text, orderClass, orderBy('ASC'), orderClass, orderBy('DESC'));
    }
    function tableRow(r, ri) {
        var _a = ri == edited ? editedCellHandler(model) : VIEWED_CELL_HANDLER, editable = _a.editable, keydown = _a.keydown, render = _a.render;
        return lit_html_1.html(templateObject_4 || (templateObject_4 = __makeTemplateObject(["<tr @dblclick=", ">", "</tr>"], ["<tr @dblclick=", ">", "</tr>"])), dblclick, r.map(function (c) { return cell(c); }));
        function dblclick(e) {
            edited = ri;
            pageView_1.redrawPage();
            e.target.focus();
        }
        function cell(c) {
            return lit_html_1.html(templateObject_5 || (templateObject_5 = __makeTemplateObject(["<td contenteditable=", " @keydown=", ">", "</td>"], ["<td contenteditable=", " @keydown=", ">", "</td>"])), editable, keydown, render('' + c));
        }
    }
}
exports.tableContent = tableContent;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
