export class WordList {
  private _wordList = new Map();

  add(newWord: string): WordList {
    if (newWord.length == 0) throw new Error('Word must consists of at least 1 letter.');
    if (newWord.indexOf(' ') >= 0) throw new Error('Only alphabetic characters are allowed.');

    newWord = newWord.toUpperCase();
    const firstLetter = newWord.charAt(0);

    if (this._wordList.has(firstLetter)) {
      const words = this._wordList.get(firstLetter);
      words.push(newWord);
      this._wordList.set(firstLetter, words);
    } else {
      this._wordList.set(firstLetter, [newWord]);
    }
    return this;
  }

  has(firstLetter: string): boolean {
    return this._wordList.has(firstLetter);
  }

  get(firstLetter: string): string[] {
    if (this.has(firstLetter)) return this._wordList.get(firstLetter);
    else return [];
  }

  count(): number {
    let count = 0;
    this._wordList.forEach((wordsOfCertainFirstLetter) => (count += wordsOfCertainFirstLetter.length));
    return count;
  }

  delete(wordToDelete: string): WordList {
    wordToDelete = wordToDelete.toUpperCase();
    const firstLetter = wordToDelete.charAt(0);

    if (this._wordList.has(firstLetter)) {
      var wordsOfFirstLetter = this._wordList.get(firstLetter);

      wordsOfFirstLetter.forEach((word, index) => {
        if (word == wordToDelete) {
          wordsOfFirstLetter.splice(index, 1);
        }
      });

      if (wordsOfFirstLetter.length) this._wordList.set(firstLetter, wordsOfFirstLetter);
      else this._wordList.delete(firstLetter);
    }

    return this;
  }
}
