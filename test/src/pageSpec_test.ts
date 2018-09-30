import {hash, PageSpec, parsePageSpec} from '../../js/pageSpec.js';

describe('PageSpec', () => {
  it('parses its own hash',
     () => [{tableId: 'T'}, {tableId: 'T', limit: 10}, {tableId: 'T', orderBy: 'foo'}, {
             tableId: 'T',
             filter: {foo: ['x', 'y']}
           }].map((p: PageSpec) => parsePageSpec(hash(p)).should.deep.equal(p)));
  it('falls back to empty if not a table', () => parsePageSpec('#blubber').should.deep.equal({}));
});
