import {expect} from '@esm-bundle/chai';
import {Direction} from '../direction';
import {Grid} from '../grid';
import {Position} from '../position';

describe('Grid initialization with zero rows and/or columns', function () {
  it('0x0 grid not allowed', () => {
    expect(() => new Grid(0, 0)).to.throw('Cannot create a Grid with zero rows or columns.');
  });
  it('0x1 grid not allowed', () => {
    expect(() => new Grid(0, 1)).to.throw('Cannot create a Grid with zero rows or columns.');
  });
  it('1x0 grid not allowed', () => {
    expect(() => new Grid(1, 0)).to.throw('Cannot create a Grid with zero rows or columns.');
  });
});

describe('Grid initialization 1x1', function () {
  it('empty grid row not allowed', () => {
    expect(() => new Grid(1, 1).addRow([])).to.throw('Amount of letters does not match the grid column size.');
  });
  it('grid row with too much columns is not allowed', () => {
    expect(() => new Grid(1, 1).addRow(['A', 'B'])).to.throw('Amount of letters does not match the grid column size.');
  });
  it('add more rows to go beyond grid size', () => {
    expect(() => new Grid(1, 1).addRow(['A']).addRow(['B'])).to.throw('Maximum allowed grid rows reached.');
  });
});

describe('Grid initialization 2x2', function () {
  it('empty grid row not allowed', () => {
    expect(() => new Grid(2, 2).addRow([])).to.throw('Amount of letters does not match the grid column size.');
  });
  it('grid row with too less columns is not allowed', () => {
    expect(() => new Grid(2, 2).addRow(['A'])).to.throw('Amount of letters does not match the grid column size.');
  });
  it('grid row with too much columns is not allowed', () => {
    expect(() => new Grid(2, 2).addRow(['A', 'B', 'C'])).to.throw(
      'Amount of letters does not match the grid column size.'
    );
  });
  it('add more rows to go beyond grid size', () => {
    const grid2x2 = new Grid(2, 2).addRow(['A', 'B']).addRow(['C', 'D']);
    expect(() => grid2x2.addRow(['A', 'B'])).to.throw('Maximum allowed grid rows reached.');
  });
});

describe('isInitialized()', function () {
  it('1x1 grid initialization', () => {
    expect(new Grid(1, 1).isInitialized()).to.equal(false);
    expect(new Grid(1, 1).addRow(['A']).isInitialized()).to.equal(true);
  });
  it('2x2 grid initialization', () => {
    expect(new Grid(2, 2).isInitialized()).to.equal(false);
    expect(new Grid(2, 2).addRow(['A', 'B']).isInitialized()).to.equal(false);
    expect(new Grid(2, 2).addRow(['A', 'B']).addRow(['C', 'D']).isInitialized()).to.equal(true);
  });
});

describe('ensureIsInitialized()', function () {
  it('1x1 grid initialization', () => {
    expect(() => new Grid(1, 1).ensureIsInitialized()).to.throw('Grid is not initialized.');
    expect(() => new Grid(1, 1).addRow(['A']).ensureIsInitialized()).to.not.throw();
  });
  it('2x2 grid initialization', () => {
    expect(() => new Grid(2, 2).ensureIsInitialized()).to.throw('Grid is not initialized.');
    expect(() => new Grid(2, 2).addRow(['A', 'B']).ensureIsInitialized()).to.throw('Grid is not initialized.');
    expect(() => new Grid(2, 2).addRow(['A', 'B']).addRow(['C', 'D']).ensureIsInitialized()).to.not.throw();
  });
});

describe('gridRowContainsOnlySingleLetters()', function () {
  it('no or empty cell', () => {
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters([])).to.equal(false);
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters([''])).to.equal(false);
  });
  it('single alphabetic Letter', () => {
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['a'])).to.equal(true);
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['A'])).to.equal(true);
  });
  it('single alphabetic Letter + empty cell', () => {
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['A', ''])).to.equal(false);
  });
  it('double alphabetic Letters in single cell', () => {
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['AA'])).to.equal(false);
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['AA', 'B'])).to.equal(false);
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['A', 'BB'])).to.equal(false);
  });
  it('single alphabetic Letter + double alphabetic Letters in single cell', () => {
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['A', 'BB'])).to.equal(false);
  });
  it('single non alphabetic Letter', () => {
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['2'])).to.equal(false);
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['22'])).to.equal(false);
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['-'])).to.equal(false);
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['#'])).to.equal(false);
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['%'])).to.equal(false);
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['\\'])).to.equal(false);
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['/'])).to.equal(false);
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['`'])).to.equal(false);
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['.'])).to.equal(false);
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['?'])).to.equal(false);
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['€'])).to.equal(false);
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['$'])).to.equal(false);
  });
});

describe('getAt()', function () {
  it('1x1 grid', () => {
    expect(() => new Grid(1, 1).getAt(1, 1)).to.throw('Grid is not initialized.');
    expect(() => new Grid(1, 1).addRow(['A']).getAt(1, 1)).to.throw('Invalid row or column provided');
    expect(new Grid(1, 1).addRow(['A']).getAt(0, 0)).to.equal('A');
  });
  it('2x2 grid', () => {
    expect(() => new Grid(2, 2).getAt(1, 1)).to.throw('Grid is not initialized.');
    expect(() => new Grid(2, 2).addRow(['A', 'B']).getAt(1, 1)).to.throw('Grid is not initialized.');
    expect(() => new Grid(2, 2).addRow(['A', 'B']).addRow(['C', 'D']).getAt(2, 2)).to.throw(
      'Invalid row or column provided'
    );
    expect(new Grid(2, 2).addRow(['A', 'B']).addRow(['C', 'D']).getAt(1, 1)).to.equal('D');
  });
});

describe('getNextCell()', function () {
  const grid5x5 = new Grid(5, 5);

  it('direction: Left to Right - valid', () => {
    expect(grid5x5.getNextCell(new Position().set(0, 0), Direction.LtR)).to.deep.equal(new Position().set(0, 1));
    expect(grid5x5.getNextCell(new Position().set(1, 1), Direction.LtR)).to.deep.equal(new Position().set(1, 2));
  });
  it('direction: Left to Right - invalid', () => {
    expect(grid5x5.getNextCell(new Position().set(-1, 2), Direction.LtR)).to.deep.equal(new Position());
    expect(grid5x5.getNextCell(new Position().set(0, 4), Direction.LtR)).to.deep.equal(new Position());
    expect(grid5x5.getNextCell(new Position().set(4, 4), Direction.LtR)).to.deep.equal(new Position());
    expect(grid5x5.getNextCell(new Position().set(5, 4), Direction.LtR)).to.deep.equal(new Position());
  });

  it('direction: Right to Left - valid', () => {
    expect(grid5x5.getNextCell(new Position().set(0, 1), Direction.RtL)).to.deep.equal(new Position().set(0, 0));
    expect(grid5x5.getNextCell(new Position().set(4, 4), Direction.RtL)).to.deep.equal(new Position().set(4, 3));
  });
  it('direction: Right to Left - invalid', () => {
    expect(grid5x5.getNextCell(new Position().set(-1, 2), Direction.RtL)).to.deep.equal(new Position());
    expect(grid5x5.getNextCell(new Position().set(0, 0), Direction.RtL)).to.deep.equal(new Position());
    expect(grid5x5.getNextCell(new Position().set(4, 0), Direction.RtL)).to.deep.equal(new Position());
    expect(grid5x5.getNextCell(new Position().set(5, 0), Direction.RtL)).to.deep.equal(new Position());
  });

  it('direction: Top Down - valid', () => {
    expect(grid5x5.getNextCell(new Position().set(0, 1), Direction.TopDown)).to.deep.equal(new Position().set(1, 1));
    expect(grid5x5.getNextCell(new Position().set(3, 4), Direction.TopDown)).to.deep.equal(new Position().set(4, 4));
  });
  it('direction: Top Down - invalid', () => {
    expect(grid5x5.getNextCell(new Position().set(-2, 1), Direction.TopDown)).to.deep.equal(new Position());
    expect(grid5x5.getNextCell(new Position().set(4, 1), Direction.TopDown)).to.deep.equal(new Position());
    expect(grid5x5.getNextCell(new Position().set(4, 4), Direction.TopDown)).to.deep.equal(new Position());
    expect(grid5x5.getNextCell(new Position().set(5, 2), Direction.TopDown)).to.deep.equal(new Position());
  });

  it('direction: Bottom Up - valid', () => {
    expect(grid5x5.getNextCell(new Position().set(1, 2), Direction.BottumUp)).to.deep.equal(new Position().set(0, 2));
    expect(grid5x5.getNextCell(new Position().set(3, 4), Direction.BottumUp)).to.deep.equal(new Position().set(2, 4));
  });
  it('direction: Bottom Up - invalid', () => {
    expect(grid5x5.getNextCell(new Position().set(-2, 1), Direction.BottumUp)).to.deep.equal(new Position());
    expect(grid5x5.getNextCell(new Position().set(0, 1), Direction.BottumUp)).to.deep.equal(new Position());
    expect(grid5x5.getNextCell(new Position().set(5, 4), Direction.BottumUp)).to.deep.equal(new Position());
    expect(grid5x5.getNextCell(new Position().set(5, 2), Direction.BottumUp)).to.deep.equal(new Position());
  });

  it('direction: TopLeft BottomRight - valid', () => {
    expect(grid5x5.getNextCell(new Position().set(0, 0), Direction.TopLBottomR)).to.deep.equal(
      new Position().set(1, 1)
    );
    expect(grid5x5.getNextCell(new Position().set(2, 3), Direction.TopLBottomR)).to.deep.equal(
      new Position().set(3, 4)
    );
  });
  it('direction: TopLeft BottomRight - invalid', () => {
    expect(grid5x5.getNextCell(new Position().set(-2, 1), Direction.TopLBottomR)).to.deep.equal(new Position());
    expect(grid5x5.getNextCell(new Position().set(4, 1), Direction.TopLBottomR)).to.deep.equal(new Position());
    expect(grid5x5.getNextCell(new Position().set(3, 4), Direction.TopLBottomR)).to.deep.equal(new Position());
    expect(grid5x5.getNextCell(new Position().set(5, 2), Direction.TopLBottomR)).to.deep.equal(new Position());
  });

  it('direction: BottomRight TopLeft - valid', () => {
    expect(grid5x5.getNextCell(new Position().set(4, 4), Direction.BottomRTopL)).to.deep.equal(
      new Position().set(3, 3)
    );
    expect(grid5x5.getNextCell(new Position().set(2, 3), Direction.BottomRTopL)).to.deep.equal(
      new Position().set(1, 2)
    );
  });
  it('direction: BottomRight TopLeft - invalid', () => {
    expect(grid5x5.getNextCell(new Position().set(-2, 1), Direction.BottomRTopL)).to.deep.equal(new Position());
    expect(grid5x5.getNextCell(new Position().set(0, 1), Direction.BottomRTopL)).to.deep.equal(new Position());
    expect(grid5x5.getNextCell(new Position().set(1, 0), Direction.BottomRTopL)).to.deep.equal(new Position());
    expect(grid5x5.getNextCell(new Position().set(5, 2), Direction.BottomRTopL)).to.deep.equal(new Position());
  });

  it('direction: BottomLeft TopRight - valid', () => {
    expect(grid5x5.getNextCell(new Position().set(0, 4), Direction.BottomLTopR)).to.deep.equal(
      new Position().set(1, 3)
    );
    expect(grid5x5.getNextCell(new Position().set(2, 3), Direction.BottomLTopR)).to.deep.equal(
      new Position().set(3, 2)
    );
  });
  it('direction: BottomLeft TopRight - invalid', () => {
    expect(grid5x5.getNextCell(new Position().set(-2, 1), Direction.BottomLTopR)).to.deep.equal(new Position());
    expect(grid5x5.getNextCell(new Position().set(1, 0), Direction.BottomLTopR)).to.deep.equal(new Position());
    expect(grid5x5.getNextCell(new Position().set(4, 0), Direction.BottomLTopR)).to.deep.equal(new Position());
    expect(grid5x5.getNextCell(new Position().set(5, 2), Direction.BottomLTopR)).to.deep.equal(new Position());
  });

  it('direction: TopRight BottomLeft - valid', () => {
    expect(grid5x5.getNextCell(new Position().set(3, 2), Direction.TopRBottomL)).to.deep.equal(
      new Position().set(2, 3)
    );
    expect(grid5x5.getNextCell(new Position().set(4, 0), Direction.TopRBottomL)).to.deep.equal(
      new Position().set(3, 1)
    );
  });
  it('direction: TopRight BottomLeft - invalid', () => {
    expect(grid5x5.getNextCell(new Position().set(-2, 1), Direction.TopRBottomL)).to.deep.equal(new Position());
    expect(grid5x5.getNextCell(new Position().set(1, 4), Direction.TopRBottomL)).to.deep.equal(new Position());
    expect(grid5x5.getNextCell(new Position().set(4, 4), Direction.TopRBottomL)).to.deep.equal(new Position());
    expect(grid5x5.getNextCell(new Position().set(5, 2), Direction.TopRBottomL)).to.deep.equal(new Position());
  });

  it('empty offset (non-set Position) results in non-existing (non-set) Position ', () => {
    expect(grid5x5.getNextCell(new Position(), Direction.LtR)).to.deep.equal(new Position());
  });
});

describe('getOffset()', function () {
  const grid5x5 = new Grid(5, 5);

  it('requested offset is within grid boundaries', () => {
    expect(grid5x5.getOffset(new Position().set(0, 0))).to.deep.equal(new Position().set(0, 1));
    expect(grid5x5.getOffset(new Position().set(0, 0))).to.not.deep.equal(new Position().set(0, 0));
    expect(grid5x5.getOffset(new Position().set(0, 4))).to.deep.equal(new Position().set(1, 0));
    expect(grid5x5.getOffset(new Position().set(0, 4))).to.not.deep.equal(new Position().set(0, 5));
    expect(grid5x5.getOffset(new Position().set(1, 4))).to.deep.equal(new Position().set(2, 0));
  });
  it('requested offset is invalid and/or outside grid boundaries', () => {
    expect(grid5x5.getOffset(new Position())).to.deep.equal(new Position());
    expect(grid5x5.getOffset(new Position().set(4, 4))).to.deep.equal(new Position());
    expect(grid5x5.getOffset(new Position().set(4, 4))).to.not.deep.equal(new Position().set(4, 5));
    expect(grid5x5.getOffset(new Position().set(4, 4))).to.not.deep.equal(new Position().set(5, 0));
  });
});
