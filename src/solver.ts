import {ALL_DIRECTIONS, Direction} from './direction';
import {WordSearchPuzzle} from './word-search-puzzle';
import {FoundWordsList, SearchHit} from './search-hit';
import {Position} from './position';

export class Solver {
  puzzle: WordSearchPuzzle;
  foundWordsList: FoundWordsList;

  constructor(puzzle: WordSearchPuzzle) {
    this.puzzle = puzzle;
    this.foundWordsList = new FoundWordsList();
  }

  solve() {
    this.walkThroughGrid();
  }

  walkThroughGrid() {
    let currentPosition = new Position().set(0, 0);

    while (currentPosition.isValid()) {
      this.searchInCell(currentPosition, ALL_DIRECTIONS);
      currentPosition = this.puzzle.grid.getNextCell(currentPosition);
    }
  }

  searchInCell(position: Position, directions: Direction[]) {
    // console.log(position.toString());

    directions.forEach((direction) => {
      this.searchInCellWithDirection(position, direction);
    });
  }

  searchInCellWithDirection(position: Position, direction: Direction) {
    const cellValues = this.puzzle.grid.getCellValues(position, direction);

    // console.log(position.toString().padEnd(5) + direction);

    if (cellValues && cellValues.length > 1 && this.puzzle.wordList.has(cellValues[0])) {
      this.searchForMatchingWords(cellValues.join('')).forEach((word) => {
        this.foundWordsList.addHit(new SearchHit(word, position, direction));
      });
    }
  }

  searchForMatchingWords(cellValues: string): string[] {
    const matchingWords: string[] = [];
    const relevantPuzzleWords = this.puzzle.wordList.get(cellValues[0]);
    relevantPuzzleWords.forEach((word) => {
      if (cellValues.substring(0, word.length) == word) {
        // console.log('FOUND !! ' + word);
        matchingWords.push(word);
      }
    });
    return matchingWords;
  }

  validateFindings() {
    if (!this.ensureAllWordsAreFoundAtLeastOnce()) throw new Error('Not all words are found.');
  }

  ensureAllWordsAreFoundAtLeastOnce(): boolean {
    return this.foundWordsList.countWords() == this.puzzle.wordCount();
  }

  presentFindings() {
    console.log('--------------------------------------------');
    console.log('Search results:');
    console.log(this.foundWordsList.countWords() + ' words with ' + this.foundWordsList.countHits() + ' hits');

    this.foundWordsList.foundWords.forEach((foundWord) => {
      let previousWord = '';
      foundWord.hits.forEach((hit) => {
        let word = hit.word;
        if (word == previousWord) word = ' >';
        else previousWord = hit.word;

        console.log(word.padEnd(13) + hit.position.toString().padEnd(6) + hit.direction);
      });
    });
  }
}
