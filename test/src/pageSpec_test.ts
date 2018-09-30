import {hash, parsePageSpec} from "../../js/pageSpec.js";

describe('PageSpec', () => it('parses its own hash', () => {
  parsePageSpec(hash({tableId: 'T'})).should.deep.equal({tableId: 'T'});
}));
