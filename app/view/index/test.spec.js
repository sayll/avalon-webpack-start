import {add,reduce} from './script/math';

describe('add', () => {
  it('1+2=3', function () {
    expect(add(1,2)).to.be.equal(3);
  });
});

describe('reduce', () => {
  it('1+2=3', function () {
    expect(reduce(2,1)).to.be.equal(1);
  });
});