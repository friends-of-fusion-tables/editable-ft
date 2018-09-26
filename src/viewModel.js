"use strict";
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
exports.BASIC_MODEL = {
    heading: 'Editable FT',
    menu: [{ item: 'About', link: 'https://github.com/friends-of-fusion-tables/editable-ft' },
        { item: 'Show tables', link: '#' }],
    tableHead: [],
    tableBody: []
};
exports.LOADING = __assign({}, exports.BASIC_MODEL, { subtitle: 'Loading...' });
exports.LOGIN = __assign({}, exports.BASIC_MODEL, { title: 'Authorization required', action: { text: 'Authorize', click: function () { return gapi.auth2.getAuthInstance().signIn(); } } });
exports.currentViewModel = exports.LOADING;
function setCurrentViewModelToTable(table, rowResponse, rowIdResponse) {
    return exports.currentViewModel = tableViewModel(table, rowResponse, rowIdResponse);
}
exports.setCurrentViewModelToTable = setCurrentViewModelToTable;
function setCurrentViewModelToListing(sql, sqlResponse) {
    return exports.currentViewModel = addRows(__assign({}, exports.BASIC_MODEL, { subtitle: sql }), sqlResponse);
}
exports.setCurrentViewModelToListing = setCurrentViewModelToListing;
/**
 * Returns ViewModel for loaded table, rows, and row IDs. Row IDs must correspond to the rows, i.e.,
 * they must come from the same query.
 */
function tableViewModel(table, rowResponse, rowIdResponse) {
    var _a = table.result, name = _a.name, description = _a.description, tableId = _a.tableId;
    var viewModel = addRows(__assign({}, exports.BASIC_MODEL, { title: name, subtitle: description, onRowChanged: onRowChanged }), rowResponse);
    return viewModel;
    function onRowChanged(index) {
        var row = viewModel.tableBody[index];
        var rowId = rowIdResponse.result.rows[index][0];
        var sql = "update " + tableId + " set " + viewModel.tableHead.map(function (c, ci) { return "'" + c + "' = '" + row[ci] + "'"; }).join(", ") + " where rowid = " + rowId;
        gapi.client.fusiontables.query.sql({ sql: sql }).execute(function (r) { return console.debug('After ' + sql + ': ' + JSON.stringify(r)); });
    }
}
/** Returns given ViewModel after setting tableHead and tableBody from given SQL response. */
function addRows(model, sqlResponse) {
    var _a = sqlResponse.result, columns = _a.columns, rows = _a.rows;
    model.tableHead = columns || [];
    model.tableBody = rows || [];
    return model;
}
