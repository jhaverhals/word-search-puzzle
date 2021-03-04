import {expect} from '@esm-bundle/chai';
import {ALL_DIRECTIONS, Direction} from '../direction';
import {SearchResult} from '../search-result';
import {Position} from '../position';
import {WordSearchPuzzle} from '../word-search-puzzle';

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

describe('uppercase()', function () {
  const uppercase1 = ['A', 'B', 'C'];
  const uppercase2 = ['A', 'B', 'C'];
  const lowercase1 = ['a', 'b', 'c'];
  const lowercase2 = ['a', 'b', 'c'];
  const mixedcase1 = ['A', 'b', 'C'];
  const mixedcase2 = ['A', 'b', 'C'];

  /* use .join('') because .equal() seems not to do a good job with case sensitive comparisson of string arrays */
  it('uppercase remains uppercase', () => {
    expect(new WordSearchPuzzle().toUppercase(uppercase1).join('')).to.equal(uppercase2.join(''));
  });
  it('lowercase becomes uppercase', () => {
    expect(new WordSearchPuzzle().toUppercase(lowercase1).join('')).to.equal(uppercase2.join(''));
  });
  it('lowercase does not remain lowercase', () => {
    expect(new WordSearchPuzzle().toUppercase(lowercase1).join('')).to.not.equal(lowercase2.join(''));
  });
  it('mixed casings becomes all uppercase', () => {
    expect(new WordSearchPuzzle().toUppercase(mixedcase1).join('')).to.equal(uppercase2.join(''));
  });
  it('mixed casings does not remain mixed', () => {
    expect(new WordSearchPuzzle().toUppercase(mixedcase1).join('')).to.not.equal(mixedcase2.join(''));
  });
});

/*

B H E S D     B H - S D
T E I T L     T E I T L
C L E A R     C L E A R
K L I M O     K L I M O
B O O T W     - O - T W

*/
const puzzle5x5 = new WordSearchPuzzle().createGrid(5, 5);
puzzle5x5
  .addGridRow(['B', 'H', 'E', 'S', 'D'])
  .addGridRow(['T', 'E', 'I', 'T', 'L'])
  .addGridRow(['C', 'L', 'E', 'A', 'R'])
  .addGridRow(['K', 'L', 'I', 'M', 'O'])
  .addGridRow(['B', 'O', 'O', 'T', 'W'])
  .addWord('hello') // top down
  .addWord('world') // down top
  .addWord('clear') // left right
  .addWord('milk') // right left
  .addWord('tilt') // down-right top-left
  .addWord('let') // down-left top-right
  .addWord('silk') // top-right down-left
  .addWord('bee'); // top-left top-right

describe('findFirstLetter()', function () {
  it('Letter in first row', () => {
    expect(puzzle5x5.findFirstLetter('E')).to.deep.equal(new Position().set(0, 2));
    expect(puzzle5x5.findFirstLetter('e')).to.deep.equal(new Position().set(0, 2));
    expect(puzzle5x5.findFirstLetter('E')).to.not.deep.equal(new Position().set(0, 1));
  });
  it('Letter in second row', () => {
    expect(puzzle5x5.findFirstLetter('T')).to.deep.equal(new Position().set(1, 0));
    expect(puzzle5x5.findFirstLetter('t')).to.deep.equal(new Position().set(1, 0));
    expect(puzzle5x5.findFirstLetter('T')).to.not.deep.equal(new Position().set(1, 3));
  });
  it('Letter in fifth/last row', () => {
    expect(puzzle5x5.findFirstLetter('W')).to.deep.equal(new Position().set(4, 4));
  });
  it('Letter not exists in grid', () => {
    expect(puzzle5x5.findFirstLetter('Q')).to.deep.equal(new Position());
    expect(puzzle5x5.findFirstLetter('Q')).to.not.deep.equal(new Position().set(0, 0));
    expect(puzzle5x5.findFirstLetter('Q')).to.not.deep.equal(new Position().set(4, 4));
  });

  it('Second letter returned due to offset', () => {
    expect(puzzle5x5.findFirstLetter('E', new Position().set(0, 2))).to.not.deep.equal(new Position().set(0, 2));
    expect(puzzle5x5.findFirstLetter('E', new Position().set(0, 2))).to.not.deep.equal(new Position().set(1, 0));
    expect(puzzle5x5.findFirstLetter('E', new Position().set(0, 2))).to.deep.equal(new Position().set(1, 1));
  });
});

describe('searchWord()', function () {
  const wordLTR = 'clear';

  it('empty word provided (as empty string)', () => {
    expect(() => puzzle5x5.searchWord('', [Direction.LtR]).length).to.throw('Word cannot be an empty string.');
  });
  it('word not found - first letter does not exists in grid', () => {
    expect(puzzle5x5.searchWord('qlear', [Direction.LtR]).length).to.equal(0);
  });
  it('word not found in given direction', () => {
    expect(puzzle5x5.searchWord(wordLTR, [Direction.RtL]).length).to.equal(0);
  });

  it('word found - direction LTR', () => {
    expect(puzzle5x5.searchWord(wordLTR, [Direction.LtR]).length).to.equal(1);
    expect(puzzle5x5.searchWord(wordLTR, [Direction.LtR])[0].getLatest()).to.deep.equal(new Position().set(2, 4));
    expect(puzzle5x5.searchWord(wordLTR, [Direction.LtR])[0].getLatest()).to.not.deep.equal(new Position().set(2, 3));
  });
  it('word found - all directions', () => {
    expect(puzzle5x5.searchWord(wordLTR, ALL_DIRECTIONS).length).to.equal(1);
    expect(puzzle5x5.searchWord(wordLTR, ALL_DIRECTIONS)[0].getLatest()).to.deep.equal(new Position().set(2, 4));
    expect(puzzle5x5.searchWord(wordLTR, ALL_DIRECTIONS)[0].getLatest()).to.not.deep.equal(new Position().set(2, 3));
  });
});
