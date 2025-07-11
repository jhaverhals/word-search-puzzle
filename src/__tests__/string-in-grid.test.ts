import {expect} from '@esm-bundle/chai'
import {StringInGrid} from '../string-in-grid'
import {Direction} from '../direction'
import {Position} from '../position'

describe('StringInGrid functionality', function () {
  it('Default initialization', () => {
    let sig = new StringInGrid('ABC', new Position().set(1, 1), Direction.LtR)
    expect(sig.string).to.equal('ABC')
  })
})
