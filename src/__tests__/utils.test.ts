import {expect} from '@esm-bundle/chai';
import {toUpperCase} from '../utils';

describe('toUpperCase()', function () {
  it('lower to upper casing', () => {
    expect(toUpperCase(['a'])).to.deep.equal(['A']);
    expect(toUpperCase(['a', 'a', 'b'])).to.deep.equal(['A', 'A', 'B']);
    expect(toUpperCase(['abc', 'def', 'ghi'])).to.deep.equal(['ABC', 'DEF', 'GHI']);
  });
  it('mixed lower and upper to upper casing', () => {
    expect(toUpperCase(['A', 'a', 'B'])).to.deep.equal(['A', 'A', 'B']);
    expect(toUpperCase(['ABC', 'DeF', 'ghi'])).to.deep.equal(['ABC', 'DEF', 'GHI']);
  });
  it('upper remains upper casing', () => {
    expect(toUpperCase(['A'])).to.deep.equal(['A']);
    expect(toUpperCase(['A', 'A', 'B'])).to.deep.equal(['A', 'A', 'B']);
    expect(toUpperCase(['ABC', 'DEF', 'GHI'])).to.deep.equal(['ABC', 'DEF', 'GHI']);
  });
});
