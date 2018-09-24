/* 
 * Copyright 2018 Anno Langen.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {html, render, TemplateResult} from "../node_modules/lit-html/lit-html";
import Sqlresponse = gapi.client.fusiontables.Sqlresponse;
import Table = gapi.client.fusiontables.Table;
import Response = gapi.client.Response;

gapi.load('client:auth2', () => {
  gapi.client.init({
    apiKey: 'YOUR_API_KEY',
    discoveryDocs: ['https://people.googleapis.com/$discovery/rest?version=v1',
      'https://www.googleapis.com/discovery/v1/apis/fusiontables/v2/rest'],
    clientId: 'YOUR_CLIENT_ID',
    scope: 'profile https://www.googleapis.com/auth/fusiontables https://www.googleapis.com/auth/fusiontables.readonly'
  }).then(() => {
    gapi.auth2.getAuthInstance().isSignedIn.listen(signInHandler);
    signInHandler(gapi.auth2.getAuthInstance().isSignedIn.get());
  });
});

const signInHandler = (isSignedIn:boolean) => isSignedIn ? route(location.hash) : drawPage(LOGIN);

/** Specification of the page, parsed from location.hash. */
interface PageSpec {
  tableId?:string;
  limit?:number;
  orderBy?:string;
  [other:string]:any;
}

var currentPageSpec = {} as PageSpec;

window.addEventListener('hashchange', () => route(location.hash));

function route(hash:string) {
  drawPage(viewModel(currentPageSpec = parsePageSpec(hash)));
}

/** Invariant: parsePageSpec(hash(s)) == s. */
function parsePageSpec(hash:string) {
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
function hash(spec:PageSpec) {
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

/** Data and behavior backing the view. */
interface ViewModel {
  heading?:string;
  menu:{item:string, link:string}[];
  title?:string;
  subtitle?:string;
  tableHead:string[];
  tableBody:any[][];
  onRowChanged?:(index:number) => void;
  action?:ButtonSpec;
}

interface ButtonSpec {text:string; click:(e:Event) => void;}

const BASIC_MODEL = {
  heading: 'Editable FT',
  menu: [{item: 'About', link: 'https://github.com/friends-of-fusion-tables/editable-ft'},
    {item: 'Show tables', link: '#'}],
  tableHead: [],
  tableBody: []
} as ViewModel;

const LOADING = {...BASIC_MODEL, subtitle: 'Loading...'} as ViewModel;

const LOGIN = {
  ...BASIC_MODEL,
  title: 'Authorization required',
  action: {text: 'Authorize', click: () => gapi.auth2.getAuthInstance().signIn()},
} as ViewModel;

var currentViewModel = LOADING;

/**
 * Returns an initial ViewModel for the given PageSpec. Loads table, rows, and row IDs concurrently
 * and returns an interstitial ViewModel. Loads listing of owned tables by default.
 */
function viewModel(spec:PageSpec) {
  const {tableId, limit, orderBy} = spec;
  if (tableId) {
    const ordering = orderBy ? ' order by ' + orderBy : '';
    loadTable(tableId, `from ${tableId}${ordering} limit ${limit || 30}`);
    return LOADING;

    async function loadTable(tableId:string, suffix:string) {
      // Three concurrent requests
      const [table, rowResult, rowIdResult] = await Promise.all(
          [gapi.client.fusiontables.table.get({tableId}),
            gapi.client.fusiontables.query.sql({sql: 'select * ' + suffix}),
            gapi.client.fusiontables.query.sql({sql: 'select ROWID ' + suffix})]);
      drawPage(currentViewModel = tableViewModel(table, rowResult, rowIdResult));
    }
  }
  loadTableListing();
  return LOADING;

  async function loadTableListing() {
    const sql = "show tables";
    const sqlResponse = await gapi.client.fusiontables.query.sql({sql});
    drawPage(currentViewModel = addRows({...BASIC_MODEL, subtitle: sql} as ViewModel, sqlResponse));
  }
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

/** Active slides out menu for small screens. See side-menu.css */
var isActive = false;

/**
 * Draw the entire page for the given ViewModel. This is efficient because lit-html re-uses
 * unchanged portions of the DOM and stamps out novel DOM portions from templates in shadow DOM.
 */
function drawPage(model:ViewModel) {
  const content = model.action ? actionContent(model.action) : tableContent(model);
  // Outer structure from http://purecss.io/layouts/side-menu/
  render(html`<div id="layout" class=${activeClass("")}>
      <a href="#menu" id="menuLink" class=${activeClass("menu-link")} @click=${toggleActive}>
        <span></span>
      </a>

      <div id="menu" class=${activeClass("")}>
        <div class="pure-menu">
          <a class="pure-menu-heading" href="#">${model.heading}</a>

          <ul class="pure-menu-list">
            ${model.menu.map(m => html`
            <li class="pure-menu-item"><a href=${m.link} class="pure-menu-link">${m.item}</a></li>
            `)}
          </ul>
        </div>
      </div>

      <div id="main">
        <div class="header">
          <h1>${model.title}</h1>
          <h2>${model.subtitle}</h2>
        </div>

        <div class="content" @click=${() => isActive && toggleActive()}>${content}</div>
      </div>
    </div>
`, document.body);

  function toggleActive() {
    isActive = !isActive;
    redrawPage();
  }
}

const activeClass = (classes:string) => isActive ? classes + " active" : classes;

function actionContent({text, click}:ButtonSpec) {
  return html`<button class="pure-button pure-button-primary" @click=${click}>${text}</button>`;
}

/** Encapsulates differences between editing and viewing a table cell. */
interface CellHandler {
  editable:boolean;
  keydown(e:KeyboardEvent):void;
  render(c:string):string|TemplateResult;
}

/**
 * For viewing, there is no keydown handler and the cell text is rewritten so that doc IDs become
 * clickable links.
 */
const VIEWED_CELL_HANDLER = {
  editable: false, keydown() {}, render(value:string) {
    const m = /^(.*)\b([01][\w-]{34,42})\b(.*)$/.exec(value);
    return m ? html`${m[1]}<a href=${hash({tableId: m[2]})}>${m[2]}</a>${m[3]}` : value;
  }
} as CellHandler;

/** The index of the edited row. -1 means no row is in edit mode. */
var edited:number = -1;

/**
 * Returns CellHandler for the given ViewModel. Cell values are rendered literally. Escape key exits
 * edit mode. Enter key, writes cell text content back to model and calls onRowChanged.
 */
function editedCellHandler({tableBody, onRowChanged}:ViewModel) {
  return {editable: true, keydown, render: (c:string) => c} as CellHandler;

  function keydown(e:KeyboardEvent) {
    if (e.code == 'Escape') {
      edited = -1;
      redrawPage();
    } else if (e.code == 'Enter') {
      const targetCell = e.target as HTMLTableCellElement;
      const cellElements = (targetCell.closest('tr') as HTMLTableRowElement).cells;
      const modelRow = tableBody[edited];
      for (var i = cellElements.length; --i >= 0;) {
        modelRow[i] = cellElements.item(i).textContent;
      }
      if (onRowChanged) onRowChanged(edited);
      edited = -1;
      redrawPage();
    }
  }
}

/**
 * Returns TemplateResult for an HTML table for the given ViewModel and current PageSpec. It is
 * intended for the content element of the side-menu layout. Header row has menu on hover for column
 * actions, presently just ordering.
 */
function tableContent(model:ViewModel) {
  return html`
    <table class="pure-table pure-table-bordered">
	   <thead>
       <tr>${model.tableHead.map(headerCell)}</tr>
	   </thead>
     <tbody>
       ${model.tableBody.map(tableRow)}
     </tbody>
    </table>`;

  function headerCell(text:string) {
    const orderBy = (dir:string) => hash(
        {...currentPageSpec, orderBy: `'${text}' ${dir}`} as PageSpec);
    const orderClass = currentPageSpec.tableId ? ['pure-menu-item'] : ['hidden'];
    return html`
<td class="pure-menu-item pure-menu-has-children pure-menu-allow-hover">
  <span class="pure-menu-link">${text}</span>
	<ul class="pure-menu-children">
	  <li class=${orderClass}><a href=${orderBy('ASC')} class="pure-menu-link">Order A->Z</a></li>
	  <li class=${orderClass}><a href=${orderBy('DESC')} class="pure-menu-link">Order Z->A</a></li>
	</ul>
</td>`;
  }

  function tableRow(r:any[], ri:number) {
    const {editable, keydown, render} =
        ri == edited ? editedCellHandler(model) : VIEWED_CELL_HANDLER;
    return html`<tr @dblclick=${dblclick}>${r.map(c => cell(c))}</tr>`;

    function dblclick(e:Event) {
      edited = ri;
      redrawPage();
      (e.target as HTMLElement).focus();
    }

    function cell(c:any) {
      return html`<td contenteditable=${editable} @keydown=${keydown}>${render('' + c)}</td>`;
    }
  }
}

const redrawPage = () => drawPage(currentViewModel);

redrawPage();
