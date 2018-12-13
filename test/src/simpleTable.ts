import {hash, PageSpec, parseToCurrentPageSpec} from '../../src/pageSpec';
import {drawPage} from '../../src/pageView';
import {BASIC_MODEL, setCurrentViewModelToTable, ViewModel} from '../../src/viewModel';

interface Sqlresponse {}
interface Table {
  tableId?: string;
}
const table = {
  'kind': 'fusiontables#table',
  'tableId': '1EnlaiKEQNQlJiPdtkuBJJFzUZFFvrP1-NQ',
  'name': 'data1.csv',
  'columns': [
    {
      'kind': 'fusiontables#column',
      'columnId': 0,
      'name': 'Product',
      'type': 'STRING',
      'formatPattern': 'NONE',
      'validateData': false
    },
    {
      'kind': 'fusiontables#column',
      'columnId': 1,
      'name': 'R1',
      'type': 'NUMBER',
      'formatPattern': 'NONE',
      'validateData': false
    },
    {
      'kind': 'fusiontables#column',
      'columnId': 2,
      'name': 'R2',
      'type': 'NUMBER',
      'formatPattern': 'NONE',
      'validateData': false
    }
  ],
  'description': 'Imported at Tue May 05 12:12:30 PDT 2009 from data1.csv.',
  'isExportable': true
};

const rowResult = {
  'kind': 'fusiontables#sqlresponse',
  'columns': ['Product', 'R1', 'R2'],
  'rows': [['A', '2', '3'], ['B', '3', '4'], ['C', '2', '4']]
};

const rowIdResult = {
  'kind': 'fusiontables#sqlresponse',
  'columns': ['rowid'],
  'rows': [['2'], ['3'], ['4']]
};

parseToCurrentPageSpec(hash({tableId: table.tableId}));
const model = {
  ...BASIC_MODEL,
  redrawPage: () => console.log('redraw'),
  routeToPage: (pageSpec: PageSpec) => console.log('route to ' + JSON.stringify(pageSpec))
} as ViewModel;
drawPage(setCurrentViewModelToTable(
    table as Table,
    rowResult as Sqlresponse,
    rowIdResult as Sqlresponse,
    undefined,
    undefined,
    model));