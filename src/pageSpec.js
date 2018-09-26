"use strict";
exports.__esModule = true;
exports.currentPageSpec = {};
/** Invariant: parsePageSpec(hash(s)) == s. */
function parsePageSpec(hash) {
    var spec = {};
    hash.replace(/^#/, '').split("&").map(function (c) {
        var e = c.split('=');
        if (e.length == 2) {
            spec[e[0]] = decodeURIComponent(e[1]);
        }
    });
    return spec.tableId ? spec : {};
}
exports.parsePageSpec = parsePageSpec;
/** Returns URL hash for the given spec. Uses & and = so that first level looks like URL params. */
function hash(spec) {
    var hash = '';
    var sep = '#';
    for (var key in spec) {
        if (spec.hasOwnProperty(key)) {
            hash += sep + key + '=' + encodeURIComponent(spec[key]);
            sep = '&';
        }
    }
    return hash;
}
exports.hash = hash;
function parseToCurrentPageSpec(hash) {
    return exports.currentPageSpec = parsePageSpec(hash);
}
exports.parseToCurrentPageSpec = parseToCurrentPageSpec;
