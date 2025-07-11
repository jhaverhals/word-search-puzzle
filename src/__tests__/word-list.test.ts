import {expect} from '@esm-bundle/chai'
import {WordList} from '../word-list'

describe('WordList functionality', function () {
  it('add() error handling', () => {
    expect(() => new WordList().add('')).to.throw('Word must consists of at least 1 letter.')
    expect(() => new WordList().add(' Abc')).to.throw('Only alphabetic characters are allowed.')
    expect(() => new WordList().add('A c')).to.throw('Only alphabetic characters are allowed.')
  })

  it('has() single word', () => {
    expect(new WordList().add('A').has('A')).to.equal(true)
    expect(new WordList().add('Abc').has('A')).to.equal(false)
  })

  it('has() second word', () => {
    expect(new WordList().add('Abc').add('Def').has('Abc')).to.equal(true, 'Abc must be there')
    expect(new WordList().add('Abc').add('Def').has('Def')).to.equal(true, 'Def must be there')
    expect(new WordList().add('Abc').add('Def').has('Ab')).to.equal(false, 'Ab should NOT be there')
  })

  it('count()', () => {
    expect(new WordList().count()).to.equal(0)
    expect(new WordList().add('Abc').count()).to.equal(1)
    expect(new WordList().add('Abc').add('Abcd').count()).to.equal(2)
    expect(new WordList().add('Abc').add('Def').count()).to.equal(2)
    expect(new WordList().add('Abc').add('Abcd').add('Def').count()).to.equal(3)
    expect(new WordList().add('Abc').add('Def').add('Abcd').count()).to.equal(3)
  })

  it('pop()', () => {
    expect(new WordList().pop()).to.equal(undefined, 'should be undefined')
    expect(new WordList().add('Abc').pop()).to.equal('ABC')
    expect(new WordList().add('Abc').add('Abcd').pop()).to.equal('ABCD')
  })

  it('sortByLengthDescending()', () => {
    expect(new WordList().add('Abc').sortByLengthDescending().pop()).to.equal('ABC', 'only one value, ABC should there')
    expect(new WordList().add('Abc').add('Abcd').sortByLengthDescending().pop()).to.equal(
      'ABCD',
      'ABCD should be the latest'
    )
    expect(new WordList().add('AbcE').add('Abc').sortByLengthDescending().pop()).to.equal(
      'ABCE',
      'ABCE should be the latest'
    )
    expect(new WordList().add('AbE').add('Defg').add('Ac').sortByLengthDescending().pop()).to.equal(
      'DEFG',
      'AAC should be the latest'
    )
  })
})
