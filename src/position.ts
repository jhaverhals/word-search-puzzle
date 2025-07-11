export class Position {
  row: number
  column: number

  set(row: number, column: number): Position {
    this.row = row
    this.column = column
    return this
  }

  isValid(): boolean {
    return this.row != undefined && this.row >= 0 && this.column != undefined && this.column >= 0 ? true : false
  }

  toString(): string {
    return this.row + '.' + this.column
  }
}
