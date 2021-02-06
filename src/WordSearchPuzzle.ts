export class WordSearchPuzzle {
  wordList = [];
  grid = [];

  addWord(newWord: string) {
    this.wordList.push(newWord);
    return this;
  }

  wordCount() {
    return this.wordList.length;
  }

  solve() {}
}
