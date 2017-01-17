import add from './add.js';

describe('求和', function() {
  it('2 + 1 = 3', function() {
    expect(add(2,1)).to.be.equal(3);
  });
});