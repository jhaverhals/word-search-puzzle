import {expect} from '@esm-bundle/chai';
import {SearchResult} from '../search-result';
import {Position} from '../position';
import {Direction} from '../direction';

describe('SearchResult functionality', function () {
  const word = 'a';
  const direction = Direction.LtR;
  const pos12 = new Position().set(1, 2);
  const pos13 = new Position().set(1, 3);
  const pos14 = new Position().set(1, 4);
  const pos12result = new Position().set(1, 2);
  const pos13result = new Position().set(1, 3);

  it('Add valid positions via constructor', () => {
    expect(new SearchResult(word, direction).length()).to.equal(0);
    expect(new SearchResult(word, direction, [pos12]).length()).to.equal(1);
    expect(new SearchResult(word, direction, [pos12, pos13]).length()).to.equal(2);
  });
  it('Add valid positions via add()', () => {
    expect(new SearchResult(word, direction).add(pos12).length()).to.equal(1);
    expect(new SearchResult(word, direction).add(pos12).add(pos13).length()).to.equal(2);
  });
  it('Add valid positions via both constructor and add()', () => {
    expect(new SearchResult(word, direction, [pos12]).add(pos13).length()).to.equal(2);
    expect(new SearchResult(word, direction, [pos12, pos13]).add(pos14).length()).to.equal(3);
  });

  it('Adding duplicate position throws error', () => {
    expect(() => new SearchResult(word, direction).add(pos12).add(pos12)).to.throw('This position is already added.');
    expect(() => new SearchResult(word, direction).add(pos12).add(pos13).add(pos12)).to.throw(
      'This position is already added.'
    );
    expect(() => new SearchResult(word, direction, [pos12]).add(pos13).add(pos12)).to.throw(
      'This position is already added.'
    );
  });

  it('isFound()', () => {
    expect(new SearchResult(word, direction).isFound()).to.equal(false);
    expect(new SearchResult(word, direction, [pos12]).isFound()).to.equal(true);
    expect(new SearchResult(word + word, direction, [pos12, pos13]).isFound()).to.equal(true);
  });

  it('getLatest() - via constructor', () => {
    expect(new SearchResult(word, direction).getLatest()).to.deep.equal(new Position());
    expect(new SearchResult(word, direction, []).getLatest()).to.deep.equal(new Position());
    expect(new SearchResult(word, direction, [new Position()]).getLatest()).to.deep.equal(new Position());
    expect(new SearchResult(word, direction, [pos12]).getLatest()).to.deep.equal(pos12result);
    expect(new SearchResult(word, direction, [pos12, pos13]).getLatest()).to.deep.equal(pos13result);
    expect(new SearchResult(word, direction, [pos12, pos13]).getLatest()).to.not.deep.equal(pos12result);
  });
  it('getLatest() - via add()', () => {
    expect(new SearchResult(word, direction).add(new Position()).getLatest()).to.deep.equal(new Position());
    expect(new SearchResult(word, direction).add(pos12).getLatest()).to.deep.equal(pos12result);
    expect(new SearchResult(word, direction).add(pos12).add(new Position()).getLatest()).to.deep.equal(new Position());
    expect(new SearchResult(word, direction).add(pos12).add(new Position()).getLatest()).to.not.deep.equal(pos12result);
    expect(new SearchResult(word, direction).add(pos12).add(pos13).getLatest()).to.deep.equal(pos13result);
  });
  it('getLatest() - via constructor + add()', () => {
    expect(new SearchResult(word, direction, [pos12]).add(pos13).getLatest()).to.deep.equal(pos13result);
  });
});
