import Sqlresponse = gapi.client.fusiontables.Sqlresponse;
import Table = gapi.client.fusiontables.Table;
import Response = gapi.client.Response;

/** Data and behavior backing the view. */
export interface ViewModel {
  heading?:string;
  menu:{item:string, link:string}[];
  title?:string;
  subtitle?:string;
  tableHead:string[];
  tableBody:any[][];
  onRowChanged?:(index:number) => void;
  action?:ButtonSpec;
}

export interface ButtonSpec {text:string; click:(e:Event) => void;}

export const BASIC_MODEL = {
  heading: 'Editable FT',
  menu: [{item: 'About', link: 'https://github.com/friends-of-fusion-tables/editable-ft'},
    {item: 'Show tables', link: '#'}],
  tableHead: [],
  tableBody: []
} as ViewModel;

export const LOADING = {...BASIC_MODEL, subtitle: 'Loading...'} as ViewModel;

export const LOGIN = {
  ...BASIC_MODEL,
  title: 'Authorization required',
  action: {text: 'Authorize', click: () => gapi.auth2.getAuthInstance().signIn()},
} as ViewModel;

export var currentViewModel = LOADING;

export function setCurrentViewModelToTable(table:Response<Table>, rowResponse:Response<Sqlresponse>,
    rowIdResponse:Response<Sqlresponse>) {
  return currentViewModel = tableViewModel(table, rowResponse, rowIdResponse);
}

export function setCurrentViewModelToListing(sql:string, sqlResponse:Response<Sqlresponse>) {
  return currentViewModel = addRows({...BASIC_MODEL, subtitle: sql} as ViewModel, sqlResponse);
}

/**
 * Returns ViewModel for loaded table, rows, and row IDs. Row IDs must correspond to the rows, i.e.,
 * they must come from the same query.
 */
function tableViewModel(table:Response<Table>, rowResponse:Response<Sqlresponse>,
    rowIdResponse:Response<Sqlresponse>) {
  const {name, description, tableId} = table.result;
  const viewModel = addRows(
      {...BASIC_MODEL, title: name, subtitle: description, onRowChanged} as ViewModel, rowResponse);
  return viewModel;

  function onRowChanged(index:number) {
    const row = viewModel.tableBody[index];
    const rowId = (rowIdResponse.result.rows as any[][])[index][0];
    const sql = `update ${tableId} set ${
        viewModel.tableHead.map((c, ci)=>`'${c}' = '${row[ci]}'`).join(", ")
        } where rowid = ${rowId}`;
    gapi.client.fusiontables.query.sql({sql}).execute(
        (r:any) => console.debug('After ' + sql + ': ' + JSON.stringify(r)));
  }
}

/** Returns given ViewModel after setting tableHead and tableBody from given SQL response. */
function addRows(model:ViewModel, sqlResponse:Response<Sqlresponse>) {
  const {columns, rows} = sqlResponse.result;
  model.tableHead = columns || [];
  model.tableBody = rows || [];
  return model;
}
