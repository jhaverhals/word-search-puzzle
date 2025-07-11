import {expect} from '@esm-bundle/chai'
import {ALL_DIRECTIONS, Direction} from '../direction'

describe('Direction options', function () {
  it('Direction enum contains at least LtR - Left to Right', () => {
    expect(Object.values(Direction).includes(Direction.LtR)).to.equal(true)
  })

  it('Ensure ALL_DIRECTIONS array equals all Direction enum entries', () => {
    expect(ALL_DIRECTIONS.length > 0).to.equal(true, 'At least one direction should be present')
    expect(ALL_DIRECTIONS.length).to.equal(Object.keys(Direction).length, 'Not equal amount of directions')

    ALL_DIRECTIONS.forEach((direction) => {
      expect(Object.values(Direction).includes(direction)).to.equal(
        true,
        'ALL_DIRECTIONS entry "' + direction + '" not found in Direction enum.'
      )
    })
  })
})
