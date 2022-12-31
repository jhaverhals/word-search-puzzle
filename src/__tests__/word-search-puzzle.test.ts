import {expect} from '@esm-bundle/chai';
import {WordSearchPuzzle} from '../word-search-puzzle';

describe('Word list functionality', function () {
  it('New puzzle has no words in list', () => {
    expect(new WordSearchPuzzle().wordCount()).to.equal(0);
  });
  it('Puzzle has one empty word in list', () => {
    expect(() => new WordSearchPuzzle().addWord('')).to.throw('Word must consists of at least 1 letter.');
  });
  it('Puzzle has one real word in list', () => {
    expect(new WordSearchPuzzle().addWord('test').wordCount()).to.equal(1);
  });
  it('Puzzle has 2 different words in list with different first letter', () => {
    expect(new WordSearchPuzzle().addWord('hello').addWord('world').wordCount()).to.equal(2);
  });
  it('Puzzle has 2 different words in list with same first letter', () => {
    expect(new WordSearchPuzzle().addWord('hello').addWord('hey').wordCount()).to.equal(2);
  });
  it('Puzzle has 3 different words in list, 2 of them with same first letter', () => {
    expect(new WordSearchPuzzle().addWord('hello').addWord('hey').addWord('world').wordCount()).to.equal(3);
  });
});
