import {html, TemplateResult} from '../node_modules/lit-html/lit-html.js';

import {currentPageSpec, hash, PageSpec} from './pageSpec.js';
import {Filter, FilterEditorModel, TableViewModel} from './viewModel.js';

/** Encapsulates differences between editing and viewing a table cell. */
interface CellHandler {
  editable: boolean;
  keydown(e: KeyboardEvent): void;
  render(c: string): string|TemplateResult;
}

/**
 * For viewing, there is no keydown handler and the cell text is rewritten so that doc IDs become
 * clickable links.
 */
const VIEWED_CELL_HANDLER = {
  editable: false,
  keydown() {},
  render(value: string) {
    const m = /^(.*)\b([01][\w-]{34,42})\b(.*)$/.exec(value);
    return m ? html`${m[1]}<a href=${hash({tableId: m[2]})}>${m[2]}</a>${m[3]}` : value;
  }
} as CellHandler;

/** The index of the edited row. -1 means no row is in edit mode. */
let edited: number = -1;

/**
 * Returns CellHandler for the given ViewModel. Cell values are rendered literally. Escape key exits
 * edit mode. Enter key, writes cell text content back to model and calls onRowChanged.
 */
function editedCellHandler({tableBody, onRowChanged, redrawPage}: TableViewModel) {
  return {editable: true, keydown, render: (c: string) => c} as CellHandler;

  function keydown(e: KeyboardEvent) {
    if (e.code === 'Escape') {
      edited = -1;
      redrawPage();
    } else if (e.code === 'Enter') {
      const targetCell = e.target as HTMLTableCellElement;
      const cellElements = (targetCell.closest('tr') as HTMLTableRowElement).cells;
      const modelRow = tableBody[edited];
      for (let i = cellElements.length; --i >= 0;) {
        modelRow[i] = (cellElements.item(i) as HTMLTableCellElement).textContent;
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
export function tableContent(model: TableViewModel) {
  return html`
    <table class="pure-table pure-table-bordered">
	   <thead>
       <tr>${model.tableHead.map(headerCell)}</tr>
	   </thead>
     <tbody>
       ${model.tableBody.map(tableRow)}
     </tbody>
    </table>`;

  function headerCell(text: string) {
    const orderBy = (dir: string) =>
        hash({...currentPageSpec, orderBy: `'${text}' ${dir}`} as PageSpec);
    const orderClass = currentPageSpec.tableId ? ['pure-menu-item'] : ['hidden'];
    const editor = getEditor(model.filterEditor);
    const menuClass = [
      'pure-menu-item',
      'pure-menu-has-children',
      editor ? 'pure-menu-active' : 'pure-menu-allow-hover'
    ].join(' ');
    return html`
<td class=${menuClass}>
  <span class="pure-menu-link">${text}</span>
	<ul class="pure-menu-children" @keydown=${onkeydown} 
	    style="border:1px solid gray;border-radius:10px">
	  <li class=${orderClass}><a href=${
        orderBy('ASC')} class="pure-menu-link">Order A->Z</a></li>
	  <li class=${orderClass}><a href=${
        orderBy('DESC')} class="pure-menu-link">Order Z->A</a></li>
	  <li class=${orderClass}>
	    <a href=${model.editFilterLink(text)} class="pure-menu-link">Filter</a>
	  </li>
	  ${editor ? filters(editor) : ''}
	</ul>
</td>`;

    function getEditor(e?: FilterEditorModel) {
      return e && e.column === text ? e : undefined;
    }

    function onkeydown(e: KeyboardEvent) {
      if (editor && e.key === 'Enter') editor.onDone();
    }

    function filters(editor: FilterEditorModel) {
      return editor.filters.map(filter);

      function filter(f: Filter) {
        return html`
     <li class="pure-menu-item">
       <input type="checkbox" ?checked=${f.selected} @change=${onchange}>
       <span>${f.value}</span>
       <span style='float:right'>${f.count}</span>
     </li>`;

        function onchange(e: Event) {
          f.selected = (e.target as HTMLInputElement).checked;
        }
      }
    }
  }

  function tableRow(r: any[], ri: number) {
    const {editable, keydown, render} =
        ri === edited ? editedCellHandler(model) : VIEWED_CELL_HANDLER;
    return html`<tr @dblclick=${dblclick}>${r.map(c => cell(c))}</tr>`;

    function dblclick(e: Event) {
      edited = ri;
      model.redrawPage();
      (e.target as HTMLElement).focus();
    }

    function cell(c: any) {
      return html`<td contenteditable=${editable} @keydown=${keydown}>${render('' + c)}</td>`;
    }
  }
}
