import {expect} from '@esm-bundle/chai';
import {Position} from '../position';

describe('Position functionality', function () {
  it('Rows and columns correctly returned', () => {
    expect(new Position(1, 2).row).to.equal(1);
    expect(new Position(1, 2).row).to.not.equal(2);
    expect(new Position(1, 2).column).to.equal(2);
    expect(new Position(1, 2).column).to.not.equal(1);
  });
});
