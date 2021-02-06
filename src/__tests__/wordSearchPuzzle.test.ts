import {expect} from '@esm-bundle/chai';
import {WordSearchPuzzle} from '../WordSearchPuzzle';

describe('Word list functionality', function () {
  it('New puzzle has no words in list', () => {
    expect(new WordSearchPuzzle().wordCount()).to.equal(0);
  });
  it('Puzzle has one empty word in list', () => {
    expect(new WordSearchPuzzle().addWord('').wordCount()).to.equal(1);
  });
  it('Puzzle has one real word in list', () => {
    expect(new WordSearchPuzzle().addWord('test').wordCount()).to.equal(1);
  });
  it('Puzzle has 2 words in list', () => {
    expect(new WordSearchPuzzle().addWord('test').addWord('test').wordCount()).to.equal(2);
  });
});
