export class WordSearchPuzzle {
  private wordList = [];
  private grid = [];
  private gridRows = 0;
  private gridCols = 0;

  addWord(newWord: string) {
    this.wordList.push(newWord);
    return this;
  }

  wordCount() {
    return this.wordList.length;
  }

  createGrid(rows: number, columns: number) {
    this.gridRows = rows;
    this.gridCols = columns;
    return this;
  }

  getGrid() {
    return this.grid;
  }

  addGridRow(letterArray: string[]) {
    if (this.grid.length == this.gridRows) {
      throw new Error('Maximum allowed grid rows reached.');
    } else if (letterArray.length != this.gridCols) {
      throw new Error('Amount of letters does not match the grid column size.');
    } else if (!this.cellsOfgridRowContainsOnlySingleLetters(letterArray)) {
      throw new Error('Each cell must contain only one alphabetic character (a-z A-Z)');
    } else this.grid.push(this.uppercase(letterArray));

    return this;
  }

  cellsOfgridRowContainsOnlySingleLetters(letterArray: string[]) {
    for (var i = 0; i < letterArray.length; i++) {
      if (!/^[a-zA-Z]$/.test(letterArray[i])) return false;
    }
    return letterArray.length > 0;
  }

  uppercase(letterArray: string[]) {
    for (var i = 0; i < letterArray.length; i++) {
      letterArray[i] = letterArray[i].toUpperCase();
    }
    return letterArray;
  }

  solve() {}
}
