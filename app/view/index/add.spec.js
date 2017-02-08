import {add} from './add';
describe('add', () => {
  it('1+2=3', function () {
    expect(add(1,2)).to.be.equal(3);
  });
});