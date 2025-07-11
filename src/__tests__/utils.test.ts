import {expect} from '@esm-bundle/chai'
import {arrayToUpperCase} from '../utils'

describe('arrayToUpperCase()', function () {
  it('lower to upper casing', () => {
    expect(arrayToUpperCase(['a'])).to.deep.equal(['A'])
    expect(arrayToUpperCase(['a', 'a', 'b'])).to.deep.equal(['A', 'A', 'B'])
    expect(arrayToUpperCase(['abc', 'def', 'ghi'])).to.deep.equal(['ABC', 'DEF', 'GHI'])
  })
  it('mixed lower and upper to upper casing', () => {
    expect(arrayToUpperCase(['A', 'a', 'B'])).to.deep.equal(['A', 'A', 'B'])
    expect(arrayToUpperCase(['ABC', 'DeF', 'ghi'])).to.deep.equal(['ABC', 'DEF', 'GHI'])
  })
  it('upper remains upper casing', () => {
    expect(arrayToUpperCase(['A'])).to.deep.equal(['A'])
    expect(arrayToUpperCase(['A', 'A', 'B'])).to.deep.equal(['A', 'A', 'B'])
    expect(arrayToUpperCase(['ABC', 'DEF', 'GHI'])).to.deep.equal(['ABC', 'DEF', 'GHI'])
  })
})
