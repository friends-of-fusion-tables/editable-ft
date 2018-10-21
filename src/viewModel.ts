import Sqlresponse = gapi.client.fusiontables.Sqlresponse;
import Table = gapi.client.fusiontables.Table;
import {currentPageSpec, PageSpec, hash} from './pageSpec.js';
import {drawPage} from './pageView.js';

/** Data and behavior backing the view. */
export interface ViewModel {
  type: string;
  heading?: string;
  menu: {item: string, link: string}[];
  title?: string;
  subtitle?: string;
  feedback?: string;

  redrawPage(): void;
  routeToPage(pageSpec: PageSpec): void;
}

export interface ActionViewModel extends ViewModel {
  type: 'action';
  action: ButtonSpec;
}

export interface ButtonSpec {
  text: string;
  click: (e: Event) => void;
}

export interface MetaViewModel extends ViewModel {
  type: 'meta';
  table: gapi.client.fusiontables.Table;
  isDirty?: boolean;
  onchange: () => void;
  saveChanges: () => void;
}

export interface TableViewModel extends ViewModel {
  type: 'table';
  tableHead: string[];
  tableBody: any[][];
  table: gapi.client.fusiontables.Table;
  onRowChanged?: (index: number) => void;

  /** Returns a URL for a page that builds a where clause for the given column. */
  editFilterLink(column: string): string;
  filterEditor?: FilterEditorModel;
}

/** Model for building the where clause for a specific column.  */
export interface FilterEditorModel {
  column: string;

  /** Constrains the values in property 'filter'. */
  filterSearch: string;
  filter: ValueFilter[];
  onDone(): void;
}

export interface ValueFilter {
  value: string;
  selected: boolean;
  count: any;
}

export const BASIC_MODEL = {
  type: 'abstract',
  heading: 'Editable FT',
  menu: [
    {item: 'About', link: 'https://github.com/friends-of-fusion-tables/editable-ft'},
    {item: 'Show tables', link: '#'}
  ],
  tableHead: [],
  tableBody: [],
  editFilterLink: () => '#',
  routeToPage: (pageSpec: PageSpec) => window.location.hash = hash(pageSpec),
  redrawPage: () => drawPage(currentViewModel),
} as ViewModel;

export const LOADING = {
  ...BASIC_MODEL,
  type: 'loading',
  subtitle: 'Loading...'
} as ViewModel;

export const LOGIN = {
  ...BASIC_MODEL,
  type: 'action',
  title: 'Authorization required',
  action: {text: 'Authorize', click: () => gapi.auth2.getAuthInstance().signIn()},
} as ViewModel;

export let currentViewModel: ViewModel = LOADING;

/**
 * Returns ViewModel for loaded table, rows, and row IDs. Row IDs must correspond to the rows, i.e.,
 * they must come from the same query.
 */
export function setCurrentViewModelToTable(
    table: Table,
    rowResponse: Sqlresponse,
    rowIdResponse: Sqlresponse,
    filterBuildingColumn?: string,
    filterValuesResponse?: Sqlresponse,
    toCopy: ViewModel = BASIC_MODEL) {
  const {name, description, tableId} = table;
  const filterEditor = ((c, r) => c && r && r.rows ? getFilterEditor(c, r.rows) : undefined)(
      filterBuildingColumn, filterValuesResponse);
  const viewModel = {
    ...toCopy,
    type: 'table',
    title: name,
    subtitle: description,
    table,
    filterEditor,
    onRowChanged,
    editFilterLink
  } as TableViewModel;
  viewModel.menu = [...viewModel.menu, {item: 'Metadata', link: hash({tableId, meta: []})}];
  currentViewModel = addRows(viewModel, rowResponse);
  return currentViewModel;

  /** Calls update SQL using the row ID and values for the given index. */
  function onRowChanged(index: number) {
    const row = viewModel.tableBody[index];
    const rowId = (rowIdResponse.rows as any[][])[index][0];
    const sql = `update ${tableId} set ${
        viewModel.tableHead.map((c, ci) => `'${c}' = '${row[ci]}'`).join(', ')} where rowid = ${
        rowId}`;
    gapi.client.fusiontables.query.sql({sql}).execute(
        (r: any) => console.debug('After ' + sql + ': ' + JSON.stringify(r)));
  }

  function editFilterLink(addFilter: string) {
    return hash({...currentPageSpec, addFilter} as PageSpec);
  }

  /**
   * Returns FilterEditorModel for the given column and rows from a group by query for that column.
   * Reflects the PageSpec's currently filtered values as "selected". Implements the property,
   * filter, as up to 20 ValueFilters whose value matches the filterSearch. Implements onDone by
   * routing to a new PageSpec, whose filters reflect the updates FilterModel.
   */
  function getFilterEditor(column: string, groupByRows: any[][]) {
    const pf = currentPageSpec.filter || {};
    const wasSelected = pf[column] || [];
    const filters = groupByRows.map(toFilter);
    return {
      column,
      filterSearch: '',
      onDone,
      get filter() {
        const re = new RegExp(this.filterSearch, 'i');
        return filters.filter(f => re.test(f.value)).slice(0, 20);
      }
    };

    function toFilter(r: any[]) {
      const value = '' + r[0];
      const selected = wasSelected.includes(value);
      return {value, count: r[1], selected} as ValueFilter;
    }

    function onDone() {
      const values = filters.filter(f => f.selected).map(f => f.value);
      if (values.length) {
        pf[column] = values;
      } else {
        delete pf[column];
      }
      if (Object.keys(pf).length) {
        currentPageSpec.filter = pf;
      } else {
        delete currentPageSpec.filter;
      }
      delete currentPageSpec.addFilter;
      toCopy.routeToPage(currentPageSpec);
    }
  }
}

/** Returns ViewModel for metadata of loaded table. */
export function setCurrentViewModelToMeta(table: Table, toCopy: ViewModel = BASIC_MODEL) {
  const {name, description} = table;
  const tableId = table.tableId!;
  const model = {...toCopy, type: 'meta', title: name, subtitle: description, table, saveChanges} as
      MetaViewModel;
  currentViewModel = model;
  return model;

  function saveChanges() {
    if (model.isDirty) {
      gapi.client.fusiontables.table.update({tableId, resource: table}).execute(resp => {
        console.log('Update metadata response ' + JSON.stringify(resp));
        model.feedback = resp.statusText;
        model.isDirty = false;
        // TODO. This is brittle. Figure out a better way to update model.
        model.title = table.name;
        model.subtitle = table.description;
        toCopy.redrawPage();
      });
    }
  }
}

export function setCurrentViewModelToListing(
    sql: string, sqlResponse: Sqlresponse, toCopy = BASIC_MODEL) {
  return currentViewModel = addRows({...toCopy, subtitle: sql} as TableViewModel, sqlResponse);
}

/** Returns given ViewModel after setting tableHead and tableBody from given SQL response. */
function addRows(model: TableViewModel, {columns, rows}: Sqlresponse) {
  model.tableHead = columns || [];
  model.tableBody = rows || [];
  return model;
}
