import {Direction} from './direction';
import {Match} from './match';
import {Position} from './position';

export class WordSearchPuzzle {
  private wordList = [];
  private grid = [];
  private gridRows = 0;
  private gridCols = 0;

  addWord(newWord: string): WordSearchPuzzle {
    this.wordList.push(newWord);
    return this;
  }

  wordCount(): number {
    return this.wordList.length;
  }

  createGrid(rows: number, columns: number): WordSearchPuzzle {
    this.gridRows = rows;
    this.gridCols = columns;
    return this;
  }

  addGridRow(letterArray: string[]): WordSearchPuzzle {
    if (this.grid.length == this.gridRows) {
      throw new Error('Maximum allowed grid rows reached.');
    } else if (letterArray.length != this.gridCols) {
      throw new Error('Amount of letters does not match the grid column size.');
    } else if (!this.cellsOfgridRowContainsOnlySingleLetters(letterArray)) {
      throw new Error('Each cell must contain only one alphabetic character (a-z A-Z)');
    } else this.grid.push(this.toUppercase(letterArray));

    return this;
  }

  cellsOfgridRowContainsOnlySingleLetters(letterArray: string[]): boolean {
    for (var i = 0; i < letterArray.length; i++) {
      if (!/^[a-zA-Z]$/.test(letterArray[i])) return false;
    }
    return letterArray.length > 0;
  }

  toUppercase(letterArray: string[]): string[] {
    for (var i = 0; i < letterArray.length; i++) {
      letterArray[i] = letterArray[i].toUpperCase();
    }
    return letterArray;
  }

  findFirstLetter(letter: string): Position {
    letter = letter.toUpperCase();
    for (var row = 0; row < this.grid.length; row++) {
      for (var column = 0; column < this.grid[row].length; column++) {
        if (this.grid[row][column] == letter) return new Position().set(row, column);
      }
    }
    return new Position();
  }

  findNextLetter(word: string, match: Match, direction: Direction): Match {
    if (match.length() == word.length) {
      throw new Error('Given word already found');
    } else {

      //TODO logic like if end of grid reached in given direction (based on last match)

      return match.add(new Position().set(2, 1));
    }
  }

  searchWord(word: string, directions: Direction[]) {

  }

  solve() {
    this.wordList.forEach(word => {
      console.log(word);

      // this.searchWord(word, [Direction.LtR, Direction.TopDown]);
    });
  }
}
