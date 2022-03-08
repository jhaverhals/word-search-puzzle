import {Direction} from './direction';
import {Position} from './position';

export class SearchResult {
  constructor(public searchWord: string, public direction: Direction, public letters?: Position[]) {
    this.searchWord = searchWord;
    this.direction = direction;
    if (letters && letters.length > 0) {
      letters.forEach((letter) => this.add(letter));
    }
    return this;
  }

  add(position: Position): SearchResult {
    if (!this.letters) {
      this.letters = [];
    }

    const positionAlreadyAdded = this.letters.find(
      (letter) => letter.row == position.row && letter.column == position.column
    );
    if (positionAlreadyAdded) {
      throw new Error('This position is already added.');
    }

    this.letters.push(position);
    return this;
  }

  length(): number {
    return this.letters ? this.letters.length : 0;
  }

  isFound(): boolean {
    return this.length() == this.searchWord.length ? true : false;
  }

  getLatest(): Position {
    return this.letters ? this.letters[this.letters.length - 1] : new Position();
  }

  getDirection(): Direction {
    return this.direction;
  }

  getSearchWord(): string {
    return this.searchWord;
  }
}
