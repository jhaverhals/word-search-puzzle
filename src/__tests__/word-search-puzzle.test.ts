import {expect} from '@esm-bundle/chai';
import {Direction} from '../direction';
import {Match} from '../match';
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

describe('gridRowContainsOnlySingleLetters()', function () {
  it('no or empty cell', () => {
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters([])).to.equal(false);
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters([''])).to.equal(false);
  });
  it('single alphabetic Letter', () => {
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['a'])).to.equal(true);
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['A'])).to.equal(true);
  });
  it('single alphabetic Letter + empty cell', () => {
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['A', ''])).to.equal(false);
  });
  it('double alphabetic Letters in single cell', () => {
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['AA'])).to.equal(false);
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['AA', 'B'])).to.equal(false);
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['A', 'BB'])).to.equal(false);
  });
  it('single alphabetic Letter + double alphabetic Letters in single cell', () => {
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['A', 'BB'])).to.equal(false);
  });
  it('single non alphabetic Letter', () => {
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['2'])).to.equal(false);
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['22'])).to.equal(false);
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['-'])).to.equal(false);
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['#'])).to.equal(false);
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['%'])).to.equal(false);
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['\\'])).to.equal(false);
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['/'])).to.equal(false);
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['`'])).to.equal(false);
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['.'])).to.equal(false);
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['?'])).to.equal(false);
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['€'])).to.equal(false);
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['$'])).to.equal(false);
  });
});

describe('Grid initialization 1x1', function () {
  it('empty grid row not allowed', () => {
    const puzzle1x1 = new WordSearchPuzzle().createGrid(1, 1);
    expect(() => puzzle1x1.addGridRow([])).to.throw('Amount of letters does not match the grid column size.');
  });
  it('grid row with too much columns is not allowed', () => {
    const puzzle1x1 = new WordSearchPuzzle().createGrid(1, 1);
    expect(() => puzzle1x1.addGridRow(['A', 'B'])).to.throw('Amount of letters does not match the grid column size.');
  });
  it('add more rows to go beyond grid size', () => {
    const puzzle1x1 = new WordSearchPuzzle().createGrid(1, 1).addGridRow(['A']);
    expect(() => puzzle1x1.addGridRow(['B'])).to.throw('Maximum allowed grid rows reached.');
  });
});

describe('Grid initialization 2x2', function () {
  it('empty grid row not allowed', () => {
    const puzzle2x2 = new WordSearchPuzzle().createGrid(2, 2);
    expect(() => puzzle2x2.addGridRow([])).to.throw('Amount of letters does not match the grid column size.');
  });
  it('grid row with too less columns is not allowed', () => {
    const puzzle2x2 = new WordSearchPuzzle().createGrid(2, 2);
    expect(() => puzzle2x2.addGridRow(['A'])).to.throw('Amount of letters does not match the grid column size.');
  });
  it('grid row with too much columns is not allowed', () => {
    const puzzle2x2 = new WordSearchPuzzle().createGrid(2, 2);
    expect(() => puzzle2x2.addGridRow(['A', 'B', 'C'])).to.throw(
      'Amount of letters does not match the grid column size.'
    );
  });
  it('add more rows to go beyond grid size', () => {
    const puzzle2x2 = new WordSearchPuzzle().createGrid(2, 2).addGridRow(['A', 'B']).addGridRow(['C', 'D']);
    expect(() => puzzle2x2.addGridRow(['A', 'B'])).to.throw('Maximum allowed grid rows reached.');
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
  it('Letter in fith/last row', () => {
    expect(puzzle5x5.findFirstLetter('W')).to.deep.equal(new Position().set(4, 4));
  });
  it('Letter not exists in grid', () => {
    expect(puzzle5x5.findFirstLetter('Q')).to.deep.equal(new Position());
    expect(puzzle5x5.findFirstLetter('Q')).to.not.deep.equal(new Position().set(0, 0));
    expect(puzzle5x5.findFirstLetter('Q')).to.not.deep.equal(new Position().set(4, 4));
  });
});

describe('findNextLetter() left-to-right', function () {
  it('all letters found', () => {
    expect(() => puzzle5x5.findNextLetter('C', new Match([new Position().set(2, 0)]), Direction.LtR)).to.throw(
      'Given word already found'
    );
  });
  it('second Letter', () => {
    expect(puzzle5x5.findNextLetter('clear', new Match([new Position().set(2, 0)]), Direction.LtR)).to.deep.equal(
      new Match([new Position().set(2, 0), new Position().set(2, 1)])
    );
  });
});
