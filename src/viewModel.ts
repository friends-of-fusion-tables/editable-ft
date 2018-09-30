import Sqlresponse = gapi.client.fusiontables.Sqlresponse;
import Table = gapi.client.fusiontables.Table;
import {currentPageSpec, PageSpec, hash} from './pageSpec.js';
import {drawPage} from './pageView.js';

/** Data and behavior backing the view. */
export interface ViewModel {
  heading?: string;
  menu: {item: string, link: string}[];
  title?: string;
  subtitle?: string;
  action?: ButtonSpec;
  tableHead: string[];
  tableBody: any[][];

  redrawPage(): void;
  routeToPage(pageSpec: PageSpec): void;
}

export interface ButtonSpec {
  text: string;
  click: (e: Event) => void;
}

export interface TableViewModel extends ViewModel {
  onRowChanged?: (index: number) => void;
  editFilterLink(column: string): string;
  filterEditor?: FilterEditorModel;
}

export interface FilterEditorModel {
  column: string;
  filters: Filter[];
  onDone(): void;
}

export interface Filter {
  value: string;
  selected: boolean;
  count: any;
}

export const BASIC_MODEL = {
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
  subtitle: 'Loading...'
} as ViewModel;

export const LOGIN = {
  ...BASIC_MODEL,
  title: 'Authorization required',
  action: {text: 'Authorize', click: () => gapi.auth2.getAuthInstance().signIn()},
} as ViewModel;

export let currentViewModel: ViewModel = LOADING;

/**
 * Returns ViewModel for loaded table, rows, and row IDs. Row IDs must correspond to the rows, i.e.,
 * they must come from the same query.
 */
export function setCurrentViewModelToTable(
    {name, description, tableId}: Table,
    rowResponse: Sqlresponse,
    rowIdResponse: Sqlresponse,
    column?: string,
    filterValuesResponse?: Sqlresponse,
    toCopy: ViewModel = BASIC_MODEL) {
  return currentViewModel = tableViewModel();

  function tableViewModel() {
    const filterEditor = column ? getFilterEditor(column) : undefined;
    const viewModel = {
      ...toCopy,
      title: name,
      subtitle: description,
      filterEditor,
      onRowChanged,
      editFilterLink
    } as ViewModel;
    return addRows(viewModel, rowResponse);

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

    function getFilterEditor(column: string) {
      const wc = currentPageSpec.filter || {};
      const wasSelected = wc[column] || [];
      const filters = filterValuesResponse!.rows!.map(toFilter);
      return {column, filters, onDone};

      function toFilter(r: any[]) {
        const value = '' + r[0];
        const selected = wasSelected.includes(value);
        return {value, count: r[1], selected} as Filter;
      }

      function onDone() {
        const values = filters.filter(f => f.selected).map(f => f.value);
        if (values.length) {
          wc[column] = values;
        } else {
          delete wc[column];
        }
        if (Object.keys(wc).length) {
          currentPageSpec.filter = wc;
        } else {
          delete currentPageSpec.filter;
        }
        delete currentPageSpec.addFilter;
        toCopy.routeToPage(currentPageSpec);
      }
    }
  }
}

export function setCurrentViewModelToListing(sql: string, sqlResponse: Sqlresponse) {
  return currentViewModel = addRows({...BASIC_MODEL, subtitle: sql} as ViewModel, sqlResponse);
}

/** Returns given ViewModel after setting tableHead and tableBody from given SQL response. */
function addRows(model: ViewModel, {columns, rows}: Sqlresponse) {
  model.tableHead = columns || [];
  model.tableBody = rows || [];
  return model;
}
