import {currentPageSpec, hash, PageSpec, parsePageSpec, parseToCurrentPageSpec, whereClauses, WhereClauseSpec} from '../../js/pageSpec';

describe('PageSpec', () => {
  it('parses its own hash',
     () => [{tableId: 'T'}, {tableId: 'T', limit: 10}, {tableId: 'T', orderBy: 'foo'}, {
             tableId: 'T',
             filter: {foo: ['x', 'y']}
           }].map((p: PageSpec) => parsePageSpec(hash(p)).should.deep.equal(p)));
  it('falls back to empty if not a table', () => parsePageSpec('#blubber').should.deep.equal({}));
  it('renders where clauses',
     () => whereClauses({foo1: ['x'], foo2: ['y', 'z'], bar: ['42']} as WhereClauseSpec, 'bar')
               .should.deep.equal([`'foo1' = 'x'`, `'foo2' in ('y','z')`]));
  it('sets currentPageSpec', () => {
    parseToCurrentPageSpec('#').should.deep.equal({});
    currentPageSpec.should.deep.equal({});
    const t = {tableId: 'T'} as PageSpec;
    parseToCurrentPageSpec(hash(t)).should.deep.equal(t);
    currentPageSpec.should.deep.equal(t);
  });
});
