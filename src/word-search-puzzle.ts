import {WordList} from './word-list';
import {Grid} from './grid';
import {arrayToUpperCase} from './utils';

export class WordSearchPuzzle {
  wordList: WordList = new WordList();
  grid: Grid;

  addWord(newWord: string): WordSearchPuzzle {
    this.wordList.add(newWord);
    return this;
  }

  wordCount(): number {
    return this.wordList.count();
  }

  createGrid(rows: number, columns: number): WordSearchPuzzle {
    this.grid = new Grid(rows, columns);
    return this;
  }

  addGridRow(letterArray: string[]): WordSearchPuzzle {
    this.grid.addRow(arrayToUpperCase(letterArray));
    return this;
  }
}
