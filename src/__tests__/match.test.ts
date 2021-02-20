import {expect} from '@esm-bundle/chai';
import {Match} from '../match';
import {Position} from '../position';

describe('Matches functionality', function () {
  it('Add via constructor', () => {
    expect(new Match().length()).to.equal(0);
    expect(new Match([new Position().set(1, 2)]).length()).to.equal(1);
    expect(new Match([new Position().set(1, 2), new Position().set(1, 2)]).length()).to.equal(2);
  });
  it('Add via add()', () => {
    expect(new Match().add(new Position().set(1, 2)).length()).to.equal(1);
    expect(new Match().add(new Position().set(1, 2)).add(new Position().set(1, 2)).length()).to.equal(2);
  });
  it('Add via both constructor and add()', () => {
    expect(new Match([new Position().set(1, 2)]).add(new Position().set(1, 2)).length()).to.equal(2);
    expect(new Match([new Position().set(1, 2), new Position().set(1, 2)]).add(new Position().set(1, 2)).length()).to.equal(3);
  });
});
