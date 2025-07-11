export class WordList {
  private _wordList = []

  add(newWord: string): WordList {
    if (newWord.length == 0) throw new Error('Word must consists of at least 1 letter.')
    if (newWord.indexOf(' ') >= 0) throw new Error('Only alphabetic characters are allowed.')

    newWord = newWord.toUpperCase()
    if (this.has(newWord)) throw new Error('Word can only be added once')

    this._wordList.push(newWord)
    return this
  }

  has(searchWord: string): boolean {
    return this._wordList.includes(searchWord.toUpperCase())
  }

  count(): number {
    return this._wordList.length
  }

  sortByLengthDescending(): WordList {
    this._wordList.sort((a, b) => a.length - b.length)
    return this
  }

  pop(): string {
    return this._wordList.pop()
  }

  toStringArray(): string[] {
    let list = []
    this._wordList.forEach((word) => list.push(word))
    return list
  }
}
