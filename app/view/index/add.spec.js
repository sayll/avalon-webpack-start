import {add} from './add';
describe('add', () => {
  it('是否符合add算法', (done) => {
    expect(add(1, 2)).to.be.equal(3); // 正确参数 'INCREMENT'
  })
});