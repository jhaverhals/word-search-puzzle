import {StringInGrid} from './string-in-grid'

export class FoundWord {
  word: string
  hits: StringInGrid[] = []

  constructor(word: string) {
    this.word = word
  }

  addHit(hit: StringInGrid): FoundWord {
    this.hits.push(hit)
    return this
  }
}

export class FoundWordsList {
  foundWords: FoundWord[] = []

  addHit(hit: StringInGrid) {
    const alreadyFound = this.foundWords.find((alreadyFound) => alreadyFound.word == hit.string)
    if (alreadyFound) {
      alreadyFound.addHit(hit)
    } else {
      this.foundWords.push(new FoundWord(hit.string).addHit(hit))
    }
  }

  countWords(): number {
    return this.foundWords.length
  }

  countHits(): number {
    let counter = 0
    this.foundWords.forEach((word) => (counter += word.hits.length))
    return counter
  }
}
