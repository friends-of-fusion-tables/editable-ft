import {hash, parseToCurrentPageSpec} from '../../js/pageSpec.js';
import {drawPage} from '../../js/pageView.js';
import {setCurrentViewModelToTable} from '../../js/viewModel.js';

interface Response<T> {
  // The JSON-parsed result.
  result: T;
}
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
drawPage(setCurrentViewModelToTable(
    {result: table} as Response<Table>,
    {result: rowResult} as Response<Sqlresponse>,
    {result: rowIdResult} as Response<Sqlresponse>));