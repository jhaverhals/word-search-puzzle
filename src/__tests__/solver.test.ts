import { expect } from '@esm-bundle/chai'
import { WordSearchPuzzle } from '../word-search-puzzle'
import { Solver } from '../solver'
import { Position } from '../position'
import { ALL_DIRECTIONS, Direction } from '../direction'

const puzzle5x5 = new WordSearchPuzzle().createGrid(5, 5)
puzzle5x5
  .addGridRow(['B', 'H', 'E', 'S', 'D'])
  .addGridRow(['T', 'E', 'I', 'T', 'L'])
  .addGridRow(['C', 'L', 'E', 'A', 'R'])
  .addGridRow(['K', 'L', 'I', 'M', 'O'])
  .addGridRow(['B', 'O', 'O', 'T', 'W'])
  .addWord('hello') // top down
  .addWord('world') // down top
  .addWord('clear') // left right
  .addWord('limo') // left right
  .addWord('milk') // right left
  .addWord('tilt') // down-right top-left
  .addWord('let') // down-left top-right
  .addWord('silk') // top-right down-left
  .addWord('bee') // top-left top-right
  .addWord('el') // 3 hits
  .addWord('ai') // 2 hits

describe('searchForWords() Right to Left', function () {
  const solver = new Solver(puzzle5x5)
  solver.searchForWords(ALL_DIRECTIONS) //[Direction.LtR, Direction.TopBottom, Direction.TopLBottomR, Direction.BottomLTopR])

  console.log(solver.foundWordsList)

  it('All words are found', () => {
    expect(solver.foundWordsList.countWords()).to.equal(11, 'All 11 words should be found using all directions')
    expect(solver.foundWordsList.countHits()).to.equal(14, 'All 11 words should result in 14 hits')
    expect(solver.ensureAllWordsAreFoundAtLeastOnce()).to.equal(true)
  })

  console.log('---------------------------- END ----------------')
})

const puzzle8x8 = new WordSearchPuzzle().createGrid(8, 8)
puzzle8x8
  .addGridRow(['B', 'H', 'B', 'S', 'B', 'B', 'B', 'B'])
  .addGridRow(['T', 'E', 'E', 'E', 'L', 'E', 'S', 'B'])
  .addGridRow(['C', 'L', 'E', 'A', 'E', 'B', 'S', 'B'])
  .addGridRow(['K', 'L', 'I', 'E', 'O', 'E', 'S', 'E'])
  .addGridRow(['B', 'O', 'O', 'T', 'H', 'H', 'H', 'B'])
  .addGridRow(['B', 'O', 'O', 'T', 'W', 'T', 'S', 'B'])
  .addGridRow(['B', 'O', 'O', 'H', 'H', 'H', 'H', 'B'])
  .addGridRow(['B', 'O', 'O', 'E', 'W', 'E', 'S', 'E'])
  .addWord('bee') // top down
  .addWord('beem') // down top
  .addWord('boot') // left right
  .addWord('toob') // right left
  .addWord('the') // all directions

// describe('puzzle() 8x8 with hits in all directions', function () {
//   const solver = new Solver(puzzle8x8)
//   solver.solve()
//   solver.presentFindings()

//   it('Correct number of matching words + hits is returned', () => {
//     expect(solver.foundWordsList.countWords()).to.equal(4)
//     expect(solver.foundWordsList.countHits()).to.equal(20)
//     expect(solver.foundWordsList.foundWords.find((result) => result.word == 'THE')?.hits.length).to.equal(9)
//   })

//   it('Findings are valid', () => {
//     expect(solver.ensureAllWordsAreFoundAtLeastOnce()).to.equal(false)
//   })
// })
