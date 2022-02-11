import {expect} from '@esm-bundle/chai';
import {WordList} from '../word-list';

describe('WordList functionality', function () {
  it('add() error handling', () => {
    expect(() => new WordList().add('')).to.throw('Word must consists of at least 1 letter.');
    expect(() => new WordList().add(' Abc')).to.throw('Only alphabetic characters are allowed.');
    expect(() => new WordList().add('A c')).to.throw('Only alphabetic characters are allowed.');
  });

  it('has() single word', () => {
    expect(new WordList().add('A').has('A')).to.equal(true);
    expect(new WordList().add('Abc').has('A')).to.equal(true);
  });

  it('has() second word', () => {
    expect(new WordList().add('Abc').add('Def').has('A')).to.equal(true);
    expect(new WordList().add('Abc').add('Def').has('D')).to.equal(true);
  });

  it('get()', () => {
    expect(new WordList().add('Abc').get('A').join()).to.equal('Abc'.toUpperCase());
    expect(new WordList().add('Abc').add('Def').get('A').join()).to.equal('Abc'.toUpperCase());
    expect(new WordList().add('Abc').add('Abcd').get('A').join()).to.equal('Abc,Abcd'.toUpperCase());
    expect(new WordList().add('Abc').add('Def').add('Abcd').get('A').join()).to.equal('Abc,Abcd'.toUpperCase());
  });

  it('count()', () => {
    expect(new WordList().count()).to.equal(0);
    expect(new WordList().add('Abc').count()).to.equal(1);
    expect(new WordList().add('Abc').add('Abcd').count()).to.equal(2);
    expect(new WordList().add('Abc').add('Def').count()).to.equal(2);
    expect(new WordList().add('Abc').add('Abcd').add('Def').count()).to.equal(3);
    expect(new WordList().add('Abc').add('Def').add('Abcd').count()).to.equal(3);
  });

  it('delete()', () => {
    expect(new WordList().add('Abc').delete('Abc').count()).to.equal(0);
    expect(new WordList().add('Abc').add('Abcd').delete('Abc').count()).to.equal(1);
    expect(new WordList().add('Abc').add('Def').delete('Abc').count()).to.equal(1);
    expect(new WordList().add('Abc').add('Abcd').add('Def').delete('Abc').delete('Def').count()).to.equal(1);
  });
});
