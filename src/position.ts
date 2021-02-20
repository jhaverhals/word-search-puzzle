export class Position {
  row: number;
  column: number;

  set(row: number, column: number) {
    this.row = row;
    this.column = column;
    return this;
  }

  exists(): boolean {
    return this.row != undefined && this.row >= 0 && this.column != undefined && this.column >= 0 ? true : false;
  }
}
