import {expect} from 'chai';
import {describe, it} from 'mocha';

import {hello} from './hello-world';


describe('Hello function', () => {
  it('should return hello world', () => {
    const result = hello();
    expect(result).to.equal('Hello world!');
  });
});