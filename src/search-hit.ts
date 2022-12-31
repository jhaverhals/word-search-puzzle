import {Direction} from './direction';
import {Position} from './position';

export class SearchHit {
  word: string;
  position: Position;
  direction: Direction;

  constructor(word: string, position: Position, direction: Direction) {
    this.word = word;
    this.position = position;
    this.direction = direction;
  }
}

export class FoundWord {
  word: string;
  hits: SearchHit[] = [];

  constructor(word: string) {
    this.word = word;
  }

  addHit(hit: SearchHit): FoundWord {
    this.hits.push(hit);
    return this;
  }
}

export class FoundWordsList {
  foundWords: FoundWord[] = [];

  addHit(hit: SearchHit) {
    const alreadyFound = this.foundWords.find((alreadyFound) => alreadyFound.word == hit.word);
    if (alreadyFound) {
      alreadyFound.addHit(hit);
    } else {
      this.foundWords.push(new FoundWord(hit.word).addHit(hit));
    }
  }

  countWords(): number {
    return this.foundWords.length;
  }

  countHits(): number {
    let counter = 0;
    this.foundWords.forEach((word) => (counter += word.hits.length));
    return counter;
  }
}
