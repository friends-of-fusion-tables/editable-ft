
import {PageSpec} from '../../js/pageSpec.js';
import {BASIC_MODEL, currentViewModel, setCurrentViewModelToListing, setCurrentViewModelToTable} from '../../js/viewModel.js';
import Sqlresponse = gapi.client.fusiontables.Sqlresponse;


const recordingModel = (() => {
  const pageSpecs: PageSpec[] = [];
  let redrawPageCount = 0;
  return {
    ...BASIC_MODEL,
    routeToPage: (p: PageSpec) => pageSpecs.push(p),
    redrawPage: () => redrawPageCount += 1,
    pageSpecs,
    getRedrawPageCount: () => redrawPageCount,
  };
})();

describe('ViewModel', () => {
  it('has boilerplate', () => {
    recordingModel.heading!.should.not.be.empty;
    recordingModel.menu.should.not.be.empty;

    recordingModel.getRedrawPageCount().should.equal(0);
    recordingModel.redrawPage();
    recordingModel.getRedrawPageCount().should.equal(1);

    recordingModel.pageSpecs.should.be.empty;
    const t = {tableId: 'T'} as PageSpec;
    recordingModel.routeToPage(t);
    recordingModel.pageSpecs.should.deep.equal([t]);
  });
  it('sets currentViewModel to listing', () => {
    const sqlResponse: Sqlresponse = {columns: ['Name', 'Id'], rows: [['X', 'ID of X']]};
    setCurrentViewModelToListing('Hello world', sqlResponse, recordingModel);

    currentViewModel.subtitle!.should.equal('Hello world');
    currentViewModel.should.not.haveOwnProperty('tableId');
    currentViewModel.tableHead.should.deep.equal(sqlResponse.columns);
    currentViewModel.tableBody.should.deep.equal(sqlResponse.rows);
  });
  it('sets currentViewModel to table', () => {
    const table = {'tableId': 'T', 'name': 'data1.csv', 'description': 'This is not data'};
    const rowResponse = {
      'columns': ['Product', 'R1', 'R2'],
      'rows': [['A', '2', '3'], ['B', '3', '4'], ['C', '2', '4']]
    };
    const rowIdResponse = {'rows': [['2'], ['3'], ['4']]};
    setCurrentViewModelToTable(
        table, rowResponse, rowIdResponse, undefined, undefined, recordingModel);

    currentViewModel.subtitle!.should.equal(table.description);
    currentViewModel.should.have.property('onRowChanged');
  });
});