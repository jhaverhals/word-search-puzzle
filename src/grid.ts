import {Direction} from './direction'
import {Position} from './position'

export enum gridSide {
  Left = 'left',
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
}

export class Grid {
  private _grid = []

  constructor(public rows: number, public columns: number) {
    if (rows <= 0 || columns <= 0) {
      throw new Error('Cannot create a Grid with zero rows or columns.')
    }
  }

  isInitialized(): boolean {
    return this._grid.length == this.rows
  }

  ensureIsInitialized(): void {
    if (!this.isInitialized()) throw new Error('Grid is not initialized.')
  }

  addRow(letterArray: string[]): Grid {
    if (this.isInitialized()) {
      throw new Error('Maximum allowed grid rows reached.')
    } else if (letterArray.length != this.columns) {
      throw new Error('Amount of letters does not match the grid column size.')
    } else if (!Grid.cellsOfgridRowContainsOnlySingleLetters(letterArray)) {
      throw new Error('Each cell must contain only one alphabetic character (a-z A-Z)')
    } else {
      this._grid.push(letterArray)
    }

    return this
  }

  static cellsOfgridRowContainsOnlySingleLetters(letterArray: string[]): boolean {
    for (var i = 0; i < letterArray.length; i++) {
      if (!/^[a-zA-Z]$/.test(letterArray[i])) return false
    }
    return letterArray.length > 0
  }

  getAt(row: number, column: number): string {
    this.ensureIsInitialized()

    if (row >= 0 && row < this.rows && column >= 0 && column < this.columns) return this._grid[row][column]
    else throw new Error('Invalid row or column provided')
  }

  getNextCellInDirection(offset: Position, direction: Direction): Position {
    const {shiftRow, shiftColumn} = this.determineRelativeCellShift(direction)

    if (this.nextCellInRequestedDirectionExistsInGrid(offset, shiftRow, shiftColumn)) {
      return new Position().set(offset.row + shiftRow, offset.column + shiftColumn)
    } else {
      return new Position()
    }
  }

  private determineRelativeCellShift(direction: Direction) {
    let shiftRow = 0
    let shiftColumn = 0

    switch (direction) {
      case Direction.LtR:
        shiftRow = 0
        shiftColumn = 1
        break
      case Direction.RtL:
        shiftRow = 0
        shiftColumn = -1
        break
      case Direction.TopBottom:
        shiftRow = 1
        shiftColumn = 0
        break
      case Direction.BottomUp:
        shiftRow = -1
        shiftColumn = 0
        break
      case Direction.TopLBottomR:
        shiftRow = 1
        shiftColumn = 1
        break
      case Direction.BottomRTopL:
        shiftRow = -1
        shiftColumn = -1
        break
      case Direction.BottomLTopR:
        shiftRow = -1
        shiftColumn = 1
        break
      case Direction.TopRBottomL:
        shiftRow = 1
        shiftColumn = -1
        break
      default:
        throw new Error('Unsupported direction: ' + direction)
    }
    return {shiftRow, shiftColumn}
  }

  private nextCellInRequestedDirectionExistsInGrid(offset: Position, shiftRow: number, shiftColumn: number) {
    return (
      offset.row >= 0 &&
      offset.row < this.rows &&
      offset.row + shiftRow >= 0 &&
      offset.row + shiftRow < this.rows &&
      offset.column >= 0 &&
      offset.column < this.columns &&
      offset.column + shiftColumn >= 0 &&
      offset.column + shiftColumn < this.columns
    )
  }

  getCellValuesFor(position: Position, lookupDirection: Direction): string[] {
    let cellValues: string[] = []

    do {
      cellValues.push(this.getAt(position.row, position.column))
      position = this.getNextCellInDirection(position, lookupDirection)
    } while (position.isValid())

    return cellValues
  }

  shiftPosition(position: Position, direction: Direction, shiftPositions: number): Position {
    while (shiftPositions > 0) {
      position = this.getNextCellInDirection(position, direction)
      shiftPositions--
    }
    return position
  }

  getSideRange(side: gridSide): [Position, Direction] {
    let startPosition: Position
    let direction: Direction

    if (!this.isInitialized()) throw new Error('Grid must be initialized before getting side range')

    switch (side) {
      case gridSide.Left:
        startPosition = new Position().set(0, 0)
        direction = Direction.TopBottom
        break
      case gridSide.Top:
        startPosition = new Position().set(0, 0)
        direction = Direction.LtR
        break
      case gridSide.Right:
        startPosition = new Position().set(0, this._grid[0].length - 1)
        direction = Direction.TopBottom
        break
      case gridSide.Bottom:
        startPosition = new Position().set(this._grid.length - 1, 0)
        direction = Direction.LtR
        break
    }

    return [startPosition, direction]
  }

  getCellPositionsFor(
    position: Position,
    lookupDirection: Direction,
    lengthLimit = -1,
    shiftPositions = 0
  ): Position[] {
    position = this.shiftPosition(position, lookupDirection, shiftPositions)

    let positionsInDirection: Position[] = []

    do {
      positionsInDirection.push(position)
      position = this.getNextCellInDirection(position, lookupDirection)
    } while (
      position.isValid() &&
      (lengthLimit == -1 || (lengthLimit > 0 && positionsInDirection.length < lengthLimit))
    )

    return positionsInDirection
  }

  getSide(side: gridSide): Position[] {
    let [startPosition, direction] = this.getSideRange(side)

    return this.getCellPositionsFor(startPosition, direction)
  }
}
