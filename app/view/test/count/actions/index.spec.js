import {COUNT} from './index';
describe('COUNT_ACTION', () => {
  it('是否符合Reducer的参数列表',(done)=>{
    expect(COUNT('INCREMENT').type).to.be.equal('INCREMENT'); // 正确参数 'INCREMENT'
    expect(COUNT('DECREMENT').type).to.be.equal('DECREMENT'); // 正确参数 'DECREMENT'
    expect(COUNT('errorType')).to.be.a('error'); // 测试错误的参数
    done();
  })
});