import {expect} from '@esm-bundle/chai';
import {Position} from '../position';

describe('Position functionality', function () {
  it('Rows and columns correctly returned', () => {
    expect(new Position().set(1, 2).row).to.equal(1);
    expect(new Position().set(1, 2).row).to.not.equal(2);
    expect(new Position().set(1, 2).column).to.equal(2);
    expect(new Position().set(1, 2).column).to.not.equal(1);
  });

  it('exists()', () => {
    expect(new Position().exists()).to.equal(false);
    expect(new Position().set(1, 2).exists()).to.equal(true);
  });
  it('exists() with zero, to guard existance (true if zero as number) checks', () => {
    expect(new Position().set(0, 2).exists()).to.equal(true);
    expect(new Position().set(2, 0).exists()).to.equal(true);
  });
});
