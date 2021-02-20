import {Position} from './position';

export class Match {
  private letters: Position[];

  constructor(letters?: Position[]) {
    if (letters) this.letters = letters;
    return this;
  }

  add(position: Position): Match {
    if (!this.letters) {
      this.letters = [];
    }

    this.letters.push(position);
    return this;
  }

  length(): number {
    if (this.letters) return this.letters.length;
    else return 0;
  }

  exists(): boolean {
    return this.length() > 0 ? true : false;
  }
}
