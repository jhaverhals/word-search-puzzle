import {expect} from '@esm-bundle/chai';
import {WordSearchPuzzle} from '../word-search-puzzle';
import {Solver} from '../solver';
import {Position} from '../position';
import {ALL_DIRECTIONS, Direction} from '../direction';

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
  .addWord('bee') // top-left top-right
  .addWord('el') // 3 hits
  .addWord('ai'); // 2 hits

describe('searchForMatchingWords()', function () {
  const solver = new Solver(puzzle5x5);

  it('Correct number of matching words is returned', () => {
    expect(solver.searchForMatchingWords('HEL').length).to.equal(0);
    expect(solver.searchForMatchingWords('HELLO').length).to.equal(1);
    expect(solver.searchForMatchingWords('HELLOX').length).to.equal(1);
    expect(solver.searchForMatchingWords('EL').length).to.equal(1);
  });
});

describe('searchInCellWithDirection()', function () {
  it('Correct number of matching words + hits is returned - one word - one hit', () => {
    const solver = new Solver(puzzle5x5);
    solver.searchInCellWithDirection(new Position().set(0, 0), Direction.TopLBottomR);

    expect(solver.foundWordsList.countWords()).to.equal(1);
    expect(solver.foundWordsList.countHits()).to.equal(1);
  });

  it('Correct number of matching words + hits is returned - no words - no hits', () => {
    const solver = new Solver(puzzle5x5);
    solver.searchInCellWithDirection(new Position().set(0, 0), Direction.BottumUp);

    expect(solver.foundWordsList.countWords()).to.equal(0);
    expect(solver.foundWordsList.countHits()).to.equal(0);
  });
});

describe('searchInCell()', function () {
  it('Correct number of matching words + hits is returned - one word - one hit', () => {
    const solver = new Solver(puzzle5x5);
    solver.searchInCell(new Position().set(0, 0), ALL_DIRECTIONS);

    expect(solver.foundWordsList.countWords()).to.equal(1);
    expect(solver.foundWordsList.countHits()).to.equal(1);
  });

  it('Correct number of matching words + hits is returned - one word - two hits', () => {
    const solver = new Solver(puzzle5x5);
    solver.searchInCell(new Position().set(2, 2), ALL_DIRECTIONS);

    expect(solver.foundWordsList.countWords()).to.equal(1);
    expect(solver.foundWordsList.foundWords[0].word).to.equal('EL');
    expect(solver.foundWordsList.countHits()).to.equal(2);
  });

  it('Correct number of matching words + hits is returned - no words - no hits', () => {
    const solver = new Solver(puzzle5x5);
    solver.searchInCell(new Position().set(1, 0), ALL_DIRECTIONS);

    expect(solver.foundWordsList.countWords()).to.equal(0);
    expect(solver.foundWordsList.countHits()).to.equal(0);
  });
});

describe('solve()', function () {
  it('Correct number of matching words + hits is returned', () => {
    const solver = new Solver(puzzle5x5);
    solver.solve();

    expect(solver.foundWordsList.countWords()).to.equal(10);
    expect(solver.foundWordsList.countHits()).to.equal(13);
  });
});
