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

  searchWord(word: string, directions: Direction[]): Match {
    const match = new Match();
    const letters = word.split('').reverse();
    const firstLetter = this.findFirstLetter(letters.pop());
    if (firstLetter.exists()) {
      match.add(firstLetter);
    }
    return match;
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
      offset.row < this.gridRows &&
      offset.row + shiftRow >= 0 &&
      offset.row + shiftRow < this.gridRows &&
      offset.column >= 0 &&
      offset.column < this.gridCols &&
      offset.column + shiftColumn >= 0 &&
      offset.column + shiftColumn < this.gridCols
    ) {
      return new Position().set(offset.row + shiftRow, offset.column + shiftColumn);
    } else {
      return new Position();
    }
  }

  solve() {
    this.wordList.forEach((word) => {
      console.log(word);

      // this.searchWord(word, [Direction.LtR, Direction.TopDown]);
    });
  }
}
