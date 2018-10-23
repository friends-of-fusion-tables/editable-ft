import {html, TemplateResult} from '../node_modules/lit-html/lit-html';

import {currentPageSpec, hash, PageSpec} from './pageSpec';
import {redrawPage} from './pageView';
import {FilterEditorModel, TableViewModel, ValueFilter} from './viewModel';

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

  /**
   * Returns TemplateResult for table header cell with the given column name. Uses "td" rather than
   * "th" lest the child menus inherit "th" style. Presents a short menu on hover. Its items each
   * have have a link that routes to a different PageSpec, the two order directions, plus a filter
   * building mode. Filter building mode is indicated by the presence of a FilterEditorModel whose
   * column matches this column's name.
   *
   * While editing filters, the sub-menu is pinned using CSS class, pure-menu-active, and it
   * includes a text input for searching filter values, followed by a listing of values with
   * checkboxes to include that value in the filter. Filter editor event handlers, update the
   * FilterEditorModel instance and may call redraw page.
   */
  function headerCell(text: string) {
    const orderBy = (dir: string) =>
        hash({...currentPageSpec, orderBy: `'${text}' ${dir}`} as PageSpec);
    const orderClass = currentPageSpec.tableId ? ['pure-menu-item'] : ['hidden'];
    const editor = (e => e && e.column === text ? e : undefined)(model.filterEditor);
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
    <li class=${orderClass}><a href=${orderBy('ASC')} class="pure-menu-link">Order A->Z</a></li>
    <li class=${orderClass}><a href=${orderBy('DESC')} class="pure-menu-link">Order Z->A</a></li>
    <li class=${orderClass}>
      <a href=${editor ? '' : model.editFilterLink(text)} class="pure-menu-link">Filter</a>
    </li>
      ${editor ? filterDone(editor) : ''}
      ${editor ? filterSearch(editor) : ''}
      ${editor ? filters(editor) : ''}
  </ul>
</td>`;

    function filterDone(editor: FilterEditorModel) {
      return html`
<li class="pure-menu-item">
  <button class="pure-menu-link pure-button-primary" @click=${() => editor.onDone()}>Apply filter
  </button>
</li>`;
    }

    function onkeydown(e: KeyboardEvent) {
      if (editor && e.key === 'Enter') editor.onDone();
    }

    function filterSearch(editor: FilterEditorModel) {
      return html`
<li class="pure-menu-item">
  <input class="pure-menu-link" type="text" placeholder="Regular expression" @input=${onInput}>
</li>`;

      function onInput(e: Event) {
        editor.filterSearch = (e.target as HTMLInputElement).value;
        redrawPage();
      }
    }

    function filters(editor: FilterEditorModel) {
      return editor.filter.map(filter);

      function filter(f: ValueFilter) {
        return html`
<li class="pure-menu-item">
  <div class="pure-menu-link">
    <input type="checkbox" ?checked=${f.selected} @change=${onchange}>
    <span>${f.value}</span>
    <span style='float:right'>${f.count}</span>
  </div>
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
    return html`<tr @dblclick=${ondblclick}>${r.map(cell)}</tr>`;

    function ondblclick(e: Event) {
      edited = ri;
      model.redrawPage();
      (e.target as HTMLElement).focus();
    }

    function cell(c: any) {
      return html`<td ?contenteditable=${editable} @keydown=${keydown}>${render('' + c)}</td>`;
    }
  }
}
