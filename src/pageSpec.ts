/** Specification of the page, parsed from location.hash. */
export interface PageSpec {
  tableId?: string;
  limit?: number;
  orderBy?: string;
  addFilter?: string;
  filter?: WhereClauseSpec;
  meta?: string[];
  [other: string]: any;
}

export interface WhereClauseSpec {
  [column: string]: string[];
}

export let currentPageSpec = {} as PageSpec;

export function whereClauses(filter?: WhereClauseSpec, except: string = '') {
  return filter ? Object.keys(filter).filter(c => c !== except).map(clause) : [];

  function clause(column: string) {
    const values = (filter as WhereClauseSpec)[column];
    return values.length === 1 ? `'${column}' = '${values[0]}'` :
                                 `'${column}' in (${values.map(v => `'${v}'`).join(',')})`;
  }
}

/** Invariant: parsePageSpec(hash(s)) == s. */
export function parsePageSpec(hash: string) {
  const spec = {} as PageSpec;
  hash.replace(/^#/, '').split('&').map(c => {
    const e = c.split('=');
    if (e.length === 2) {
      spec[e[0]] = JSON.parse(decodeURIComponent(e[1]));
    }
  });
  return spec.tableId ? spec : {};
}

/** Returns URL hash for the given spec. Uses & and = so that first level looks like URL params. */
export function hash(spec: PageSpec) {
  const encode = (value: any) => encodeURIComponent(JSON.stringify(value));
  return '#' + Object.keys(spec).map((key: string) => `${key}=${encode(spec[key])}`).join('&');
}

export function parseToCurrentPageSpec(hash: string) {
  return currentPageSpec = parsePageSpec(hash);
}