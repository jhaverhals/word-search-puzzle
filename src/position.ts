export class Position {
  row: number;
  column: number;

  set(row: number, column: number) {
    this.row = row;
    this.column = column;
    return this;
  }

  exists(): boolean {
    return this.row && this.column ? true : false;
  }
}
