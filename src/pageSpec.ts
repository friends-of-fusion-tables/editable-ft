/** Specification of the page, parsed from location.hash. */
export interface PageSpec {
  tableId?:string;
  limit?:number;
  orderBy?:string;
  [other:string]:any;
}

export var currentPageSpec = {} as PageSpec;

/** Invariant: parsePageSpec(hash(s)) == s. */
export function parsePageSpec(hash:string) {
  const spec = {} as PageSpec;
  hash.replace(/^#/, '').split("&").map(c=> {
    const e = c.split('=');
    if (e.length == 2) {
      spec[e[0]] = decodeURIComponent(e[1]);
    }
  });
  return spec.tableId ? spec : {};
}

/** Returns URL hash for the given spec. Uses & and = so that first level looks like URL params. */
export function hash(spec:PageSpec) {
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

export function parseToCurrentPageSpec(hash:string) {
  return currentPageSpec = parsePageSpec(hash);
}