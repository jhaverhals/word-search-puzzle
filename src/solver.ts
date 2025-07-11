import { Direction } from './direction'
import { WordSearchPuzzle } from './word-search-puzzle'
import { FoundWordsList } from './search-hit'
import { Position } from './position'
import { StringInGrid } from './string-in-grid'
import { gridSide } from './grid'
import { LookupDirections } from './grid-lookup-directions'

export class Solver {
  puzzle: WordSearchPuzzle
  foundWordsList: FoundWordsList

  constructor(puzzle: WordSearchPuzzle) {
    this.puzzle = puzzle
    this.foundWordsList = new FoundWordsList()
  }

  solve() {
    // this.searchForWords(ALL_DIRECTIONS)
    this.validateFindings()
    this.presentFindings()
  }

  searchForWords(directions: Direction[]) {
    const wordList = this.puzzle.wordList.sortByLengthDescending().toStringArray()

    for (const side in gridSide) {
      directions.forEach((direction) => {
        if (LookupDirections.getDirections(gridSide[side]).includes(direction)) {
          this.puzzle.grid.getSide(gridSide[side]).forEach((position) => {
            let cellValues = this.puzzle.grid.getCellValuesFor(position, direction).join('')

            console.log(`side: ${gridSide[side].padEnd(6)} ${direction.padEnd(25)} ${position.toString()}`)

            wordList.forEach((word) => {
              let foundPos = cellValues.indexOf(word)
              if (foundPos >= 0) {
                console.log(
                  `${gridSide[side].padEnd(6)} ${direction.padEnd(25)} - ${position.row}.${position.column
                  } - ${cellValues}`
                )
                let foundWord = new StringInGrid(
                  word,
                  this.puzzle.grid.shiftPosition(position, direction, foundPos),
                  direction
                )
                this.foundWordsList.addHit(foundWord)

                this.printFinding(word, position, direction, foundPos)
              }
            })
          })
        }
      })
    }
  }

  printFinding(word: string, position: Position, direction: Direction, shiftPositionInDirection: number) {
    const wordPositions = this.puzzle.grid.getCellPositionsFor(
      position,
      direction,
      word.length,
      shiftPositionInDirection
    )

    console.log(`_ +${' -'.repeat(this.puzzle.grid.columns)} +`)

    for (let row = 0; row < this.puzzle.grid.rows; row++) {
      let line = `${row} |`
      for (let col = 0; col < this.puzzle.grid.columns; col++) {
        if (wordPositions.find((pos) => pos.row == row && pos.column == col))
          line += ` ${this.puzzle.grid.getAt(row, col)}`
        else line += '  '
      }
      line += ' |'
      console.log(line)
    }
    console.log(`_ +${' -'.repeat(this.puzzle.grid.columns)} +`)
  }

  validateFindings() {
    if (!this.ensureAllWordsAreFoundAtLeastOnce()) throw new Error('Not all words are found.')
  }

  ensureAllWordsAreFoundAtLeastOnce(): boolean {
    return this.foundWordsList.countWords() == this.puzzle.wordCount()
  }

  presentFindings() {
    console.log('--------------------------------------------')
    console.log('Search results:')
    console.log(this.foundWordsList.countWords() + ' words with ' + this.foundWordsList.countHits() + ' hits')

    this.foundWordsList.foundWords.forEach((foundWord) => {
      let previousWord = ''
      foundWord.hits.forEach((hit) => {
        let word = hit.string
        if (word == previousWord) word = ' >'
        else previousWord = hit.string

        console.log(word.padEnd(13) + hit.position.toString().padEnd(6) + hit.direction)
      })
    })
  }
}
