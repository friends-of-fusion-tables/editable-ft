import {html, TemplateResult} from "../node_modules/lit-html/lit-html";
import {ViewModel} from "./viewModel";
import {hash, PageSpec, currentPageSpec} from "./pageSpec";
import {redrawPage} from "./pageView";

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
export function tableContent(model:ViewModel) {
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

