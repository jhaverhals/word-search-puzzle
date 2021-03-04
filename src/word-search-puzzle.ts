import {Direction} from './direction';
import {SearchResult} from './search-result';
import {Position} from './position';
import {Grid} from './grid';

export class WordSearchPuzzle {
  private _wordList = [];
  private _grid: Grid;

  addWord(newWord: string): WordSearchPuzzle {
    this._wordList.push(newWord);
    return this;
  }

  wordCount(): number {
    return this._wordList.length;
  }

  createGrid(rows: number, columns: number): WordSearchPuzzle {
    this._grid = new Grid(rows, columns);
    return this;
  }

  addGridRow(letterArray: string[]): WordSearchPuzzle {
    this._grid.addRow(this.toUppercase(letterArray));
    return this;
  }

  toUppercase(letterArray: string[]): string[] {
    for (var i = 0; i < letterArray.length; i++) {
      letterArray[i] = letterArray[i].toUpperCase();
    }
    return letterArray;
  }

  findFirstLetter(letter: string, lastHit?: Position): Position {
    let rowOffset = 0;
    let columnOffset = 0;

    if (lastHit && lastHit.isFound()) {
      const offset = this._grid.getOffset(lastHit);
      rowOffset = offset.row;
      columnOffset = offset.column;
    }

    let notYetFound = true;
    const position = new Position();
    letter = letter.toUpperCase();

    for (var row = rowOffset; row < this._grid.rows && notYetFound; row++) {
      for (var column = columnOffset; column < this._grid.columns && notYetFound; column++) {
        if (this._grid.getAt(row, column) == letter) {
          position.set(row, column);
          notYetFound = false;
        }
      }
      // reset column offset when moving to next row
      columnOffset = 0;
    }
    return position;
  }

  searchWord(word: string, directions: Direction[], offset?: Position): SearchResult[] {
    if (word == '') throw new Error('Word cannot be an empty string.');

    const searchResults: SearchResult[] = [];
    const letters = word.toUpperCase().split('');
    const firstLetter = this.findFirstLetter(letters.shift());

    if (firstLetter.isFound()) {
      directions.forEach((direction) => {
        const result = new SearchResult(word, directions[0]);
        result.add(firstLetter);

        while (letters.length > 0 && this._grid.getNextCell(result.getLatest(), direction).isFound()) {
          const cell = this._grid.getNextCell(result.getLatest(), direction);

          if (letters.shift() == this._grid.getAt(cell.row, cell.column)) {
            result.add(cell);
          } else {
            break;
          }
        }

        if (result.isFound()) searchResults.push(result);
      });
    }

    return searchResults;
  }

  solve() {
    this._wordList.forEach((word) => {
      console.log(word);

      // this.searchWord(word, [Direction.LtR, Direction.TopDown]);
    });
  }
}
