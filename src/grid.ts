import {Direction} from './direction';
import {Position} from './position';

export class Grid {
  private _grid = [];
  private _rows = 0;
  private _columns = 0;

  constructor(rows: number, columns: number) {
    if (rows <= 0 || columns <= 0) {
      throw new Error('Cannot create a Grid with zero rows or columns.');
    }
    this.rows = rows;
    this.columns = columns;
  }

  get rows() {
    return this._rows;
  }

  set rows(value) {
    this._rows = value;
  }

  get columns() {
    return this._columns;
  }

  set columns(value) {
    this._columns = value;
  }

  isInitialized(): boolean {
    return this._grid.length == this.rows;
  }

  ensureIsInitialized(): void {
    if (!this.isInitialized()) throw new Error('Grid is not initialized.');
  }

  addRow(letterArray: string[]): Grid {
    if (this.isInitialized()) {
      throw new Error('Maximum allowed grid rows reached.');
    } else if (letterArray.length != this.columns) {
      throw new Error('Amount of letters does not match the grid column size.');
    } else if (!Grid.cellsOfgridRowContainsOnlySingleLetters(letterArray)) {
      throw new Error('Each cell must contain only one alphabetic character (a-z A-Z)');
    } else {
      this._grid.push(letterArray);
    }

    return this;
  }

  length(): number {
    return this._grid.length;
  }

  static cellsOfgridRowContainsOnlySingleLetters(letterArray: string[]): boolean {
    for (var i = 0; i < letterArray.length; i++) {
      if (!/^[a-zA-Z]$/.test(letterArray[i])) return false;
    }
    return letterArray.length > 0;
  }

  getAt(row: number, column: number): string {
    this.ensureIsInitialized();

    if (row >= 0 && row < this.rows && column >= 0 && column < this.columns) return this._grid[row][column];
    else throw new Error('Invalid row or column provided');
  }

  getNextCell(offset: Position, direction: Direction): Position {
    let shiftRow = 0;
    let shiftColumn = 0;

    switch (direction) {
      case Direction.LtR:
        shiftRow = 0;
        shiftColumn = 1;
        break;
      case Direction.RtL:
        shiftRow = 0;
        shiftColumn = -1;
        break;
      case Direction.TopDown:
        shiftRow = 1;
        shiftColumn = 0;
        break;
      case Direction.BottumUp:
        shiftRow = -1;
        shiftColumn = 0;
        break;
      case Direction.TopLBottomR:
        shiftRow = 1;
        shiftColumn = 1;
        break;
      case Direction.BottomRTopL:
        shiftRow = -1;
        shiftColumn = -1;
        break;
      case Direction.BottomLTopR:
        shiftRow = 1;
        shiftColumn = -1;
        break;
      case Direction.TopRBottomL:
        shiftRow = -1;
        shiftColumn = 1;
        break;
      default:
        throw new Error('Unsupported direction: ' + direction);
    }

    if (
      offset.row >= 0 &&
      offset.row < this.rows &&
      offset.row + shiftRow >= 0 &&
      offset.row + shiftRow < this.rows &&
      offset.column >= 0 &&
      offset.column < this.columns &&
      offset.column + shiftColumn >= 0 &&
      offset.column + shiftColumn < this.columns
    ) {
      return new Position().set(offset.row + shiftRow, offset.column + shiftColumn);
    } else {
      return new Position();
    }
  }

  getOffset(lastHit: Position): Position {
    if (
      lastHit.row >= 0 &&
      lastHit.row < this.rows &&
      lastHit.column >= 0 &&
      lastHit.column < this.columns &&
      !(lastHit.row == this.rows - 1 && lastHit.column == this.columns - 1)
    ) {
      let row = lastHit.row;
      let column = lastHit.column;

      if (column + 1 == this.columns) {
        column = 0;
        row++;
      } else {
        column++;
      }
      return new Position().set(row, column);
    } else {
      return new Position();
    }
  }
}
