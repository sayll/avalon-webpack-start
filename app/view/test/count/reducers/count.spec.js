import count from './count';
import {COUNT} from '../actions/index';
describe('countReducer', () => {
  it('INCREMENT', () => {
    expect(count(1, COUNT('INCREMENT'))).to.be.equal(2);
  });
  it('DECREMENT', () => {
    expect(count(undefined, COUNT('DECREMENT'))).to.be.equal(-1);
  });
  it('err', () => {
    expect(count(0, COUNT('err'))).to.be.equal(0);
  });
  it('', () => {
    expect(count(undefined, '')).to.be.equal(0);
  });
});