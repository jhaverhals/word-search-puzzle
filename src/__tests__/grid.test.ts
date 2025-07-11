import {expect} from '@esm-bundle/chai'
import {Direction} from '../direction'
import {Grid, gridSide} from '../grid'
import {Position} from '../position'

describe('Grid initialization with zero rows and/or columns should not be possible', function () {
  it('0x0 grid not allowed', () => {
    expect(() => new Grid(0, 0)).to.throw('Cannot create a Grid with zero rows or columns.')
  })
  it('0x1 grid not allowed', () => {
    expect(() => new Grid(0, 1)).to.throw('Cannot create a Grid with zero rows or columns.')
  })
  it('1x0 grid not allowed', () => {
    expect(() => new Grid(1, 0)).to.throw('Cannot create a Grid with zero rows or columns.')
  })
})

describe('Grid initialization 1x1', function () {
  it('empty grid row not allowed', () => {
    expect(() => new Grid(1, 1).addRow([])).to.throw('Amount of letters does not match the grid column size.')
  })
  it('grid row with too much columns is not allowed', () => {
    expect(() => new Grid(1, 1).addRow(['A', 'B'])).to.throw('Amount of letters does not match the grid column size.')
  })
  it('add more rows to go beyond grid size', () => {
    expect(() => new Grid(1, 1).addRow(['A']).addRow(['B'])).to.throw('Maximum allowed grid rows reached.')
  })
})

describe('Grid initialization 2x2', function () {
  it('empty grid row not allowed', () => {
    expect(() => new Grid(2, 2).addRow([])).to.throw('Amount of letters does not match the grid column size.')
  })
  it('grid row with too less columns is not allowed', () => {
    expect(() => new Grid(2, 2).addRow(['A'])).to.throw('Amount of letters does not match the grid column size.')
  })
  it('grid row with too much columns is not allowed', () => {
    expect(() => new Grid(2, 2).addRow(['A', 'B', 'C'])).to.throw(
      'Amount of letters does not match the grid column size.'
    )
  })
  it('add more rows to go beyond grid size', () => {
    const grid2x2 = new Grid(2, 2).addRow(['A', 'B']).addRow(['C', 'D'])
    expect(() => grid2x2.addRow(['A', 'B'])).to.throw('Maximum allowed grid rows reached.')
  })
})

describe('isInitialized()', function () {
  it('1x1 grid initialization', () => {
    expect(new Grid(1, 1).isInitialized()).to.equal(false)
    expect(new Grid(1, 1).addRow(['A']).isInitialized()).to.equal(true)
  })
  it('2x2 grid initialization', () => {
    expect(new Grid(2, 2).isInitialized()).to.equal(false)
    expect(new Grid(2, 2).addRow(['A', 'B']).isInitialized()).to.equal(false)
    expect(new Grid(2, 2).addRow(['A', 'B']).addRow(['C', 'D']).isInitialized()).to.equal(true)
  })
})

describe('ensureIsInitialized()', function () {
  it('1x1 grid initialization', () => {
    expect(() => new Grid(1, 1).ensureIsInitialized()).to.throw('Grid is not initialized.')
    expect(() => new Grid(1, 1).addRow(['A']).ensureIsInitialized()).to.not.throw()
  })
  it('2x2 grid initialization', () => {
    expect(() => new Grid(2, 2).ensureIsInitialized()).to.throw('Grid is not initialized.')
    expect(() => new Grid(2, 2).addRow(['A', 'B']).ensureIsInitialized()).to.throw('Grid is not initialized.')
    expect(() => new Grid(2, 2).addRow(['A', 'B']).addRow(['C', 'D']).ensureIsInitialized()).to.not.throw()
  })
})

describe('gridRowContainsOnlySingleLetters()', function () {
  it('no or empty cell', () => {
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters([])).to.equal(false)
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters([''])).to.equal(false)
  })
  it('single alphabetic Letter', () => {
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['a'])).to.equal(true)
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['A'])).to.equal(true)
  })
  it('single alphabetic Letter + empty cell', () => {
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['A', ''])).to.equal(false)
  })
  it('double alphabetic Letters in single cell', () => {
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['AA'])).to.equal(false)
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['AA', 'B'])).to.equal(false)
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['A', 'BB'])).to.equal(false)
  })
  it('single alphabetic Letter + double alphabetic Letters in single cell', () => {
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['A', 'BB'])).to.equal(false)
  })
  it('single non alphabetic Letter', () => {
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['2'])).to.equal(false)
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['22'])).to.equal(false)
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['-'])).to.equal(false)
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['#'])).to.equal(false)
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['%'])).to.equal(false)
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['\\'])).to.equal(false)
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['/'])).to.equal(false)
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['`'])).to.equal(false)
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['.'])).to.equal(false)
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['?'])).to.equal(false)
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['€'])).to.equal(false)
    expect(Grid.cellsOfgridRowContainsOnlySingleLetters(['$'])).to.equal(false)
  })
})

describe('getAt()', function () {
  it('1x1 grid', () => {
    expect(() => new Grid(1, 1).getAt(1, 1)).to.throw('Grid is not initialized.')
    expect(() => new Grid(1, 1).addRow(['A']).getAt(1, 1)).to.throw('Invalid row or column provided')
    expect(new Grid(1, 1).addRow(['A']).getAt(0, 0)).to.equal('A')
  })
  it('2x2 grid', () => {
    expect(() => new Grid(2, 2).getAt(1, 1)).to.throw('Grid is not initialized.')
    expect(() => new Grid(2, 2).addRow(['A', 'B']).getAt(1, 1)).to.throw('Grid is not initialized.')
    expect(() => new Grid(2, 2).addRow(['A', 'B']).addRow(['C', 'D']).getAt(2, 2)).to.throw(
      'Invalid row or column provided'
    )
    expect(new Grid(2, 2).addRow(['A', 'B']).addRow(['C', 'D']).getAt(1, 1)).to.equal('D')
  })
})

describe('getNextCellInDirection()', function () {
  const grid5x5 = new Grid(5, 5)

  it('direction: Left to Right - valid', () => {
    expect(grid5x5.getNextCellInDirection(new Position().set(0, 0), Direction.LtR)).to.deep.equal(
      new Position().set(0, 1)
    )
    expect(grid5x5.getNextCellInDirection(new Position().set(1, 1), Direction.LtR)).to.deep.equal(
      new Position().set(1, 2)
    )
  })
  it('direction: Left to Right - invalid', () => {
    expect(grid5x5.getNextCellInDirection(new Position().set(-1, 2), Direction.LtR)).to.deep.equal(new Position())
    expect(grid5x5.getNextCellInDirection(new Position().set(0, 4), Direction.LtR)).to.deep.equal(new Position())
    expect(grid5x5.getNextCellInDirection(new Position().set(4, 4), Direction.LtR)).to.deep.equal(new Position())
    expect(grid5x5.getNextCellInDirection(new Position().set(5, 4), Direction.LtR)).to.deep.equal(new Position())
  })

  it('direction: Right to Left - valid', () => {
    expect(grid5x5.getNextCellInDirection(new Position().set(0, 1), Direction.RtL)).to.deep.equal(
      new Position().set(0, 0)
    )
    expect(grid5x5.getNextCellInDirection(new Position().set(4, 4), Direction.RtL)).to.deep.equal(
      new Position().set(4, 3)
    )
  })
  it('direction: Right to Left - invalid', () => {
    expect(grid5x5.getNextCellInDirection(new Position().set(-1, 2), Direction.RtL)).to.deep.equal(new Position())
    expect(grid5x5.getNextCellInDirection(new Position().set(0, 0), Direction.RtL)).to.deep.equal(new Position())
    expect(grid5x5.getNextCellInDirection(new Position().set(4, 0), Direction.RtL)).to.deep.equal(new Position())
    expect(grid5x5.getNextCellInDirection(new Position().set(5, 0), Direction.RtL)).to.deep.equal(new Position())
  })

  it('direction: Top Down - valid', () => {
    expect(grid5x5.getNextCellInDirection(new Position().set(0, 1), Direction.TopBottom)).to.deep.equal(
      new Position().set(1, 1)
    )
    expect(grid5x5.getNextCellInDirection(new Position().set(3, 4), Direction.TopBottom)).to.deep.equal(
      new Position().set(4, 4)
    )
  })
  it('direction: Top Down - invalid', () => {
    expect(grid5x5.getNextCellInDirection(new Position().set(-2, 1), Direction.TopBottom)).to.deep.equal(new Position())
    expect(grid5x5.getNextCellInDirection(new Position().set(4, 1), Direction.TopBottom)).to.deep.equal(new Position())
    expect(grid5x5.getNextCellInDirection(new Position().set(4, 4), Direction.TopBottom)).to.deep.equal(new Position())
    expect(grid5x5.getNextCellInDirection(new Position().set(5, 2), Direction.TopBottom)).to.deep.equal(new Position())
  })

  it('direction: Bottom Up - valid', () => {
    expect(grid5x5.getNextCellInDirection(new Position().set(1, 2), Direction.BottomUp)).to.deep.equal(
      new Position().set(0, 2)
    )
    expect(grid5x5.getNextCellInDirection(new Position().set(3, 4), Direction.BottomUp)).to.deep.equal(
      new Position().set(2, 4)
    )
  })
  it('direction: Bottom Up - invalid', () => {
    expect(grid5x5.getNextCellInDirection(new Position().set(-2, 1), Direction.BottomUp)).to.deep.equal(new Position())
    expect(grid5x5.getNextCellInDirection(new Position().set(0, 1), Direction.BottomUp)).to.deep.equal(new Position())
    expect(grid5x5.getNextCellInDirection(new Position().set(5, 4), Direction.BottomUp)).to.deep.equal(new Position())
    expect(grid5x5.getNextCellInDirection(new Position().set(5, 2), Direction.BottomUp)).to.deep.equal(new Position())
  })

  it('direction: TopLeft BottomRight - valid', () => {
    expect(grid5x5.getNextCellInDirection(new Position().set(0, 0), Direction.TopLBottomR)).to.deep.equal(
      new Position().set(1, 1)
    )
    expect(grid5x5.getNextCellInDirection(new Position().set(2, 3), Direction.TopLBottomR)).to.deep.equal(
      new Position().set(3, 4)
    )
  })
  it('direction: TopLeft BottomRight - invalid', () => {
    expect(grid5x5.getNextCellInDirection(new Position().set(-2, 1), Direction.TopLBottomR)).to.deep.equal(
      new Position()
    )
    expect(grid5x5.getNextCellInDirection(new Position().set(4, 1), Direction.TopLBottomR)).to.deep.equal(
      new Position()
    )
    expect(grid5x5.getNextCellInDirection(new Position().set(3, 4), Direction.TopLBottomR)).to.deep.equal(
      new Position()
    )
    expect(grid5x5.getNextCellInDirection(new Position().set(5, 2), Direction.TopLBottomR)).to.deep.equal(
      new Position()
    )
  })

  it('direction: BottomRight TopLeft - valid', () => {
    expect(grid5x5.getNextCellInDirection(new Position().set(4, 4), Direction.BottomRTopL)).to.deep.equal(
      new Position().set(3, 3)
    )
    expect(grid5x5.getNextCellInDirection(new Position().set(2, 3), Direction.BottomRTopL)).to.deep.equal(
      new Position().set(1, 2)
    )
  })
  it('direction: BottomRight TopLeft - invalid', () => {
    expect(grid5x5.getNextCellInDirection(new Position().set(-2, 1), Direction.BottomRTopL)).to.deep.equal(
      new Position()
    )
    expect(grid5x5.getNextCellInDirection(new Position().set(0, 1), Direction.BottomRTopL)).to.deep.equal(
      new Position()
    )
    expect(grid5x5.getNextCellInDirection(new Position().set(1, 0), Direction.BottomRTopL)).to.deep.equal(
      new Position()
    )
    expect(grid5x5.getNextCellInDirection(new Position().set(5, 2), Direction.BottomRTopL)).to.deep.equal(
      new Position()
    )
  })

  it('direction: BottomLeft TopRight - valid', () => {
    expect(grid5x5.getNextCellInDirection(new Position().set(1, 3), Direction.BottomLTopR)).to.deep.equal(
      new Position().set(0, 4)
    )
    expect(grid5x5.getNextCellInDirection(new Position().set(3, 2), Direction.BottomLTopR)).to.deep.equal(
      new Position().set(2, 3)
    )
  })
  it('direction: BottomLeft TopRight - invalid', () => {
    expect(grid5x5.getNextCellInDirection(new Position().set(-2, 1), Direction.BottomLTopR)).to.deep.equal(
      new Position()
    )
    expect(grid5x5.getNextCellInDirection(new Position().set(0, 1), Direction.BottomLTopR)).to.deep.equal(
      new Position()
    )
    expect(grid5x5.getNextCellInDirection(new Position().set(1, 4), Direction.BottomLTopR)).to.deep.equal(
      new Position()
    )
    expect(grid5x5.getNextCellInDirection(new Position().set(5, 2), Direction.BottomLTopR)).to.deep.equal(
      new Position()
    )
  })

  it('direction: TopRight BottomLeft - valid', () => {
    expect(grid5x5.getNextCellInDirection(new Position().set(2, 3), Direction.TopRBottomL)).to.deep.equal(
      new Position().set(3, 2)
    )
    expect(grid5x5.getNextCellInDirection(new Position().set(0, 4), Direction.TopRBottomL)).to.deep.equal(
      new Position().set(1, 3)
    )
  })
  it('direction: TopRight BottomLeft - invalid', () => {
    expect(grid5x5.getNextCellInDirection(new Position().set(-2, 1), Direction.TopRBottomL)).to.deep.equal(
      new Position()
    )
    expect(grid5x5.getNextCellInDirection(new Position().set(1, 0), Direction.TopRBottomL)).to.deep.equal(
      new Position()
    )
    expect(grid5x5.getNextCellInDirection(new Position().set(4, 1), Direction.TopRBottomL)).to.deep.equal(
      new Position()
    )
    expect(grid5x5.getNextCellInDirection(new Position().set(5, 2), Direction.TopRBottomL)).to.deep.equal(
      new Position()
    )
  })

  it('empty offset (non-set Position) results in non-existing (non-set) Position', () => {
    expect(grid5x5.getNextCellInDirection(new Position(), Direction.LtR)).to.deep.equal(new Position())
  })
})

const grid4x4 = new Grid(4, 4)
grid4x4.addRow(['A', 'B', 'C', 'D'])
grid4x4.addRow(['E', 'F', 'G', 'H'])
grid4x4.addRow(['I', 'J', 'K', 'L'])
grid4x4.addRow(['M', 'N', 'O', 'P'])

describe('getSideRange()', function () {
  it('getSideRange for Left', () => {
    let [startPosition, direction] = grid4x4.getSideRange(gridSide.Left)

    expect(startPosition.row).to.equal(0, 'Start position-row is not correct')
    expect(startPosition.column).to.equal(0, 'Start position-column is not correct')
    expect(direction).to.equal(Direction.TopBottom)
  })

  it('getSideRange for Top', () => {
    let [startPosition, direction] = grid4x4.getSideRange(gridSide.Top)

    expect(startPosition.row).to.equal(0, 'Start position-row is not correct')
    expect(startPosition.column).to.equal(0, 'Start position-column is not correct')
    expect(direction).to.equal(Direction.LtR)
  })

  it('getSideRange for Right', () => {
    let [startPosition, direction] = grid4x4.getSideRange(gridSide.Right)

    expect(startPosition.row).to.equal(0, 'Start position-row is not correct')
    expect(startPosition.column).to.equal(3, 'Start position-column is not correct')
    expect(direction).to.equal(Direction.TopBottom)
  })

  it('getSideRange for Bottom', () => {
    let [startPosition, direction] = grid4x4.getSideRange(gridSide.Bottom)

    expect(startPosition.row).to.equal(3, 'Start position-row is not correct')
    expect(startPosition.column).to.equal(0, 'Start position-column is not correct')
    expect(direction).to.equal(Direction.LtR)
  })
})

describe('getCellValuesFor()', function () {
  it('getCellValuesFor > Left to Right', () => {
    expect(grid4x4.getCellValuesFor(new Position().set(0, 0), Direction.LtR).join('')).to.equal('ABCD')
    expect(grid4x4.getCellValuesFor(new Position().set(0, 1), Direction.LtR).join('')).to.equal('BCD')
  })

  it('getCellValuesFor > TopRight to BottomLeft', () => {
    expect(grid4x4.getCellValuesFor(new Position().set(0, 0), Direction.TopRBottomL).join('')).to.equal('A')
    expect(grid4x4.getCellValuesFor(new Position().set(1, 3), Direction.TopRBottomL).join('')).to.equal('HKN')
  })

  it('getCellValuesFor > BottomLeft to TopRight', () => {
    expect(grid4x4.getCellValuesFor(new Position().set(1, 0), Direction.BottomLTopR).join('')).to.equal('EB')
    expect(grid4x4.getCellValuesFor(new Position().set(3, 1), Direction.BottomLTopR).join('')).to.equal('NKH')
  })
})

describe('shiftPosition()', function () {
  it('shiftPosition > Left to Right', () => {
    expect(grid4x4.shiftPosition(new Position().set(0, 0), Direction.LtR, 0)).to.deep.equal(
      new Position().set(0, 0),
      'Position should not be changed'
    )
    expect(grid4x4.shiftPosition(new Position().set(0, 0), Direction.LtR, 1)).to.deep.equal(
      new Position().set(0, 1),
      'Position should be 0.1'
    )
    expect(grid4x4.shiftPosition(new Position().set(1, 1), Direction.LtR, 2)).to.deep.equal(
      new Position().set(1, 3),
      'Position should be 1.3'
    )
    expect(grid4x4.shiftPosition(new Position().set(1, 1), Direction.LtR, 3).isValid()).to.equal(
      false,
      'Position 1.4 should be invalid because it exceeds border'
    )
  })

  it('shiftPosition > TopLeft to BottomRight', () => {
    expect(grid4x4.shiftPosition(new Position().set(0, 0), Direction.TopLBottomR, 0)).to.deep.equal(
      new Position().set(0, 0),
      'Position should not be changed'
    )
    expect(grid4x4.shiftPosition(new Position().set(0, 0), Direction.TopLBottomR, 1)).to.deep.equal(
      new Position().set(1, 1),
      'Position should be 1.1'
    )
    expect(grid4x4.shiftPosition(new Position().set(1, 1), Direction.TopLBottomR, 2)).to.deep.equal(
      new Position().set(3, 3),
      'Position should be 3.3'
    )
    expect(grid4x4.shiftPosition(new Position().set(1, 1), Direction.TopLBottomR, 3).isValid()).to.equal(
      false,
      'Position 4.4 should be invalid because it exceeds border'
    )
  })

  it('shiftPosition > TopRight to BottomLeft', () => {
    expect(grid4x4.shiftPosition(new Position().set(1, 1), Direction.TopRBottomL, 0)).to.deep.equal(
      new Position().set(1, 1),
      'Position should not be changed'
    )
    expect(grid4x4.shiftPosition(new Position().set(1, 1), Direction.TopRBottomL, 1)).to.deep.equal(
      new Position().set(2, 0),
      'Position should be 2.0'
    )
    expect(grid4x4.shiftPosition(new Position().set(1, 1), Direction.TopRBottomL, 2).isValid()).to.equal(
      false,
      'Position 3.-1 should be invalid because it exceeds border'
    )
  })
})

describe('getCellPositionsFor()', function () {
  it('getCellPositionsFor for Left, 0.0 > Left to Right', () => {
    let cellPositions = grid4x4.getCellPositionsFor(new Position().set(0, 0), Direction.LtR)

    expect(cellPositions.length).to.equal(4, 'Range length is not correct')
    expect(cellPositions[3].row).to.equal(0, 'Row value of last cell is not correct')
    expect(cellPositions[3].column).to.equal(3, 'Column value of last cell is not correct')
  })

  it('getCellPositionsFor for Left, 0.0 > Left to Right > limit 2', () => {
    let cellPositions = grid4x4.getCellPositionsFor(new Position().set(0, 0), Direction.LtR, 2)

    expect(cellPositions.length).to.equal(2, 'Range length is not correct')
  })

  it('getCellPositionsFor for Left, 0.0 > Left to Right > limit 2 > shiftPositions 0', () => {
    let cellPositions = grid4x4.getCellPositionsFor(new Position().set(0, 0), Direction.LtR, 2, 0)

    expect(cellPositions.length).to.equal(2, 'Range length is not correct')
  })

  it('getCellPositionsFor for Left, 0.0 > Left to Right > limit 2 > shiftPositions 1', () => {
    let cellPositions = grid4x4.getCellPositionsFor(new Position().set(0, 0), Direction.LtR, 2, 1)

    expect(cellPositions.length).to.equal(2, 'Range length is not correct')
  })

  it('getCellPositionsFor for Left, 0.0 > Left to Right > limit 2 > shiftPositions 3', () => {
    let cellPositions = grid4x4.getCellPositionsFor(new Position().set(0, 0), Direction.LtR, 2, 3)

    expect(cellPositions.length).to.equal(1, 'Range length is not correct')
  })

  it('getCellPositionsFor for Left, 0.0 > TopLeft to BottomRight', () => {
    let cellPositions = grid4x4.getCellPositionsFor(new Position().set(0, 0), Direction.TopLBottomR)

    expect(cellPositions.length).to.equal(4, 'Range length is not correct')
    expect(cellPositions[3].row).to.equal(3, 'Row value of last cell is not correct')
    expect(cellPositions[3].column).to.equal(3, 'Column value of last cell is not correct')
  })

  it('getCellPositionsFor for Left, 1.0 > TopLeft to BottomRight', () => {
    let cellPositions = grid4x4.getCellPositionsFor(new Position().set(1, 0), Direction.TopLBottomR)

    expect(cellPositions.length).to.equal(3, 'Range length is not correct')
    expect(cellPositions[2].row).to.equal(3, 'Row value of last cell is not correct')
    expect(cellPositions[2].column).to.equal(2, 'Column value of last cell is not correct')
  })

  it('getCellPositionsFor for Left, 0.0 > BottomLeft to TopRight', () => {
    let cellPositions = grid4x4.getCellPositionsFor(new Position().set(0, 0), Direction.BottomLTopR)

    expect(cellPositions.length).to.equal(1, 'Range length is not correct')
    expect(cellPositions[0].row).to.equal(0, 'Row value of last cell is not correct')
    expect(cellPositions[0].column).to.equal(0, 'Column value of last cell is not correct')
  })

  it('getCellPositionsFor for Left, 1.0 > BottomLeft to TopRight', () => {
    let cellPositions = grid4x4.getCellPositionsFor(new Position().set(1, 0), Direction.BottomLTopR)

    expect(cellPositions.length).to.equal(2, 'Range length is not correct')
    expect(cellPositions[1].row).to.equal(0, 'Row value of last cell is not correct')
    expect(cellPositions[1].column).to.equal(1, 'Column value of last cell is not correct')
  })

  it('getCellPositionsFor for Top, 0.0 > Top to Bottom', () => {
    let cellPositions = grid4x4.getCellPositionsFor(new Position().set(0, 0), Direction.TopBottom)

    expect(cellPositions.length).to.equal(4, 'Range length is not correct')
    expect(cellPositions[3].row).to.equal(3, 'Row value of last cell is not correct')
    expect(cellPositions[3].column).to.equal(0, 'Column value of last cell is not correct')
  })

  it('getCellPositionsFor for Top, 0.0 > TopLeft to BottomRight', () => {
    let cellPositions = grid4x4.getCellPositionsFor(new Position().set(0, 0), Direction.TopLBottomR)

    expect(cellPositions.length).to.equal(4, 'Range length is not correct')
    expect(cellPositions[3].row).to.equal(3, 'Row value of last cell is not correct')
    expect(cellPositions[3].column).to.equal(3, 'Column value of last cell is not correct')
  })

  it('getCellPositionsFor for Top, 0.1 > TopLeft to BottomRight', () => {
    let cellPositions = grid4x4.getCellPositionsFor(new Position().set(0, 1), Direction.TopLBottomR)

    expect(cellPositions.length).to.equal(3, 'Range length is not correct')
    expect(cellPositions[2].row).to.equal(2, 'Row value of last cell is not correct')
    expect(cellPositions[2].column).to.equal(3, 'Column value of last cell is not correct')
  })

  it('getCellPositionsFor for Top, 0.0 > TopRight to BottomLeft', () => {
    let cellPositions = grid4x4.getCellPositionsFor(new Position().set(0, 0), Direction.TopRBottomL)

    expect(cellPositions.length).to.equal(1, 'Range length is not correct')
    expect(cellPositions[0].row).to.equal(0, 'Row value of last cell is not correct')
    expect(cellPositions[0].column).to.equal(0, 'Column value of last cell is not correct')
  })

  it('getCellPositionsFor for Top, 0.2 > TopRight to BottomLeft', () => {
    let cellPositions = grid4x4.getCellPositionsFor(new Position().set(0, 2), Direction.TopRBottomL)

    expect(cellPositions.length).to.equal(3, 'Range length is not correct')
    expect(cellPositions[2].row).to.equal(2, 'Row value of last cell is not correct')
    expect(cellPositions[2].column).to.equal(0, 'Column value of last cell is not correct')
  })

  it('getCellPositionsFor for Top, 0.2 > TopRight to BottomLeft > limit 2', () => {
    let cellPositions = grid4x4.getCellPositionsFor(new Position().set(0, 2), Direction.TopRBottomL, 2)

    expect(cellPositions.length).to.equal(2, 'Range length is not correct')
  })

  it('getCellPositionsFor for Top, 0.2 > TopRight to BottomLeft > limit 2 > shiftPositions 2', () => {
    let cellPositions = grid4x4.getCellPositionsFor(new Position().set(0, 2), Direction.TopRBottomL, 2, 2)

    expect(cellPositions.length).to.equal(1, 'Range length is not correct')
  })

  it('getCellPositionsFor for Right, 1.3 > Right to Left', () => {
    let cellPositions = grid4x4.getCellPositionsFor(new Position().set(1, 3), Direction.RtL)

    expect(cellPositions.length).to.equal(4, 'Range length is not correct')
    expect(cellPositions[3].row).to.equal(1, 'Row value of last cell is not correct')
    expect(cellPositions[3].column).to.equal(0, 'Column value of last cell is not correct')
  })

  it('getCellPositionsFor for Right, 1.3 > TopRight to BottomLeft', () => {
    let cellPositions = grid4x4.getCellPositionsFor(new Position().set(1, 3), Direction.TopRBottomL)

    expect(cellPositions.length).to.equal(3, 'Range length is not correct')
    expect(cellPositions[2].row).to.equal(3, 'Row value of last cell is not correct')
    expect(cellPositions[2].column).to.equal(1, 'Column value of last cell is not correct')
  })

  it('getCellPositionsFor for Right, 1.3 > BottomRight to TopLeft', () => {
    let cellPositions = grid4x4.getCellPositionsFor(new Position().set(1, 3), Direction.BottomRTopL)

    expect(cellPositions.length).to.equal(2, 'Range length is not correct')
    expect(cellPositions[1].row).to.equal(0, 'Row value of last cell is not correct')
    expect(cellPositions[1].column).to.equal(2, 'Column value of last cell is not correct')
  })

  it('getCellPositionsFor for Right, 1.3 > BottomRight to TopLeft > limit 1', () => {
    let cellPositions = grid4x4.getCellPositionsFor(new Position().set(1, 3), Direction.BottomRTopL, 1)

    expect(cellPositions.length).to.equal(1, 'Range length is not correct')
  })

  it('getCellPositionsFor for Bottom, 3.2 > Bottom to Top', () => {
    let cellPositions = grid4x4.getCellPositionsFor(new Position().set(3, 2), Direction.BottomUp)

    expect(cellPositions.length).to.equal(4, 'Range length is not correct')
    expect(cellPositions[3].row).to.equal(0, 'Row value of last cell is not correct')
    expect(cellPositions[3].column).to.equal(2, 'Column value of last cell is not correct')
  })

  it('getCellPositionsFor for Bottom, 3.2 > BottomRight to TopLeft', () => {
    let cellPositions = grid4x4.getCellPositionsFor(new Position().set(3, 2), Direction.BottomRTopL)

    expect(cellPositions.length).to.equal(3, 'Range length is not correct')
    expect(cellPositions[2].row).to.equal(1, 'Row value of last cell is not correct')
    expect(cellPositions[2].column).to.equal(0, 'Column value of last cell is not correct')
  })

  it('getCellPositionsFor for Bottom, 3.2 > BottomLeft to TopRight', () => {
    let cellPositions = grid4x4.getCellPositionsFor(new Position().set(3, 2), Direction.BottomLTopR)

    expect(cellPositions.length).to.equal(2, 'Range length is not correct')
    expect(cellPositions[1].row).to.equal(2, 'Row value of last cell is not correct')
    expect(cellPositions[1].column).to.equal(3, 'Column value of last cell is not correct')
  })

  it('getCellPositionsFor for Bottom, 3.3 > BottomLeft to TopRight > limit 2', () => {
    let cellPositions = grid4x4.getCellPositionsFor(new Position().set(3, 3), Direction.BottomLTopR, 2)

    expect(cellPositions.length).to.equal(1, 'Range length is not correct')
  })
})

describe('getSide()', function () {
  it('getSide > Left', () => {
    let sidePositions = grid4x4.getSide(gridSide.Left)

    expect(sidePositions.length).to.equal(4, 'Side should have 4 positions')

    let lastPos = sidePositions.pop()

    expect(lastPos?.column).to.equal(0, 'End position-column is not correct')
    expect(lastPos?.row).to.equal(3, 'End position-row is not correct')
  })

  it('getSide > Bottom', () => {
    let sidePositions = grid4x4.getSide(gridSide.Bottom)

    expect(sidePositions.length).to.equal(4, 'Side should have 4 positions')

    let lastPos = sidePositions.pop()

    expect(lastPos?.column).to.equal(3, 'End position-column is not correct')
    expect(lastPos?.row).to.equal(3, 'End position-row is not correct')
  })

  it('getSide > Right', () => {
    let sidePositions = grid4x4.getSide(gridSide.Right)

    expect(sidePositions.length).to.equal(4, 'Side should have 4 positions')

    let lastPos = sidePositions.pop()

    expect(lastPos?.column).to.equal(3, 'End position-column is not correct')
    expect(lastPos?.row).to.equal(3, 'End position-row is not correct')
  })

  it('getSide > Top', () => {
    let sidePositions = grid4x4.getSide(gridSide.Top)

    expect(sidePositions.length).to.equal(4, 'Side should have 4 positions')

    let lastPos = sidePositions.pop()

    expect(lastPos?.column).to.equal(3, 'End position-column is not correct')
    expect(lastPos?.row).to.equal(0, 'End position-row is not correct')
  })
})
