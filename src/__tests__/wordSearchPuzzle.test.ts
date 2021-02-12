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

describe('gridRowContainsOnlySingleLetters()', function () {
  it('no or empty cell', () => {
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters([])).to.equal(false);
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters([''])).to.equal(false);
  });
  it('single alphabetic character', () => {
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['a'])).to.equal(true);
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['A'])).to.equal(true);
  });
  it('single alphabetic character + empty cell', () => {
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['A', ''])).to.equal(false);
  });
  it('double alphabetic characters in single cell', () => {
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['AA'])).to.equal(false);
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['AA', 'B'])).to.equal(false);
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['A', 'BB'])).to.equal(false);
  });
  it('single alphabetic character + double alphabetic characters in single cell', () => {
    expect(new WordSearchPuzzle().cellsOfgridRowContainsOnlySingleLetters(['A', 'BB'])).to.equal(false);
  });
  it('single non alphabetic character', () => {
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

  it('uppercase remains uppercase', () => {
    expect(new WordSearchPuzzle().uppercase(uppercase1).join('')).to.equal(uppercase2.join(''));
  });
  it('lowercase becomes uppercase', () => {
    expect(new WordSearchPuzzle().uppercase(lowercase1).join('')).to.equal(uppercase2.join(''));
  });
  it('lowercase does not remain lowercase', () => {
    expect(new WordSearchPuzzle().uppercase(lowercase1).join('')).to.not.equal(lowercase2.join(''));
  });
  it('mixed casings becomes all uppercase', () => {
    expect(new WordSearchPuzzle().uppercase(mixedcase1).join('')).to.equal(uppercase2.join(''));
  });
  it('mixed casings does not remain mixed', () => {
    expect(new WordSearchPuzzle().uppercase(mixedcase1).join('')).to.not.equal(mixedcase2.join(''));
  });
});
