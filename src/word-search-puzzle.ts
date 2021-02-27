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

    if (lastHit && lastHit.exists()) {
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

  findNextLetter(word: string, searchResult: SearchResult, direction: Direction): SearchResult {
    if (searchResult.length() == word.length) {
      throw new Error('Given word already found');
    } else {
      //TODO logic like if end of grid reached in given direction (based on last match)

      return searchResult.add(new Position().set(2, 1));
    }
  }

  searchWord(word: string, directions: Direction[], offset?: Position): SearchResult[] {
    const searchResults: SearchResult[] = [];
    const letters = word.toUpperCase().split('');
    const firstLetter = this.findFirstLetter(letters.shift());

    if (firstLetter.exists()) {
      const match = new SearchResult(word, directions[0]);
      match.add(firstLetter);

      directions.forEach((direction) => {
        while (this._grid.getNextCell(match.getLatest(), direction).exists()) {
          const cell = this._grid.getNextCell(match.getLatest(), direction);
          if (letters.shift == this._grid[cell.row][cell.column]) {
            match.add(cell);
          } else {
            break;
          }
        }
      });
    }

    console.log(searchResults);

    return searchResults;
  }

  solve() {
    this._wordList.forEach((word) => {
      console.log(word);

      // this.searchWord(word, [Direction.LtR, Direction.TopDown]);
    });
  }
}
