/**
 * 测试唯一的二个正确正确参数
 * 代入一个错误的参数
 * */
export function COUNT(type/*INCREMENT or DECREMENT*/) {
  if (type !== 'INCREMENT' && type !== 'DECREMENT') {
    console.error(Error('COUNT type not INCREMENT or DECREMENT'));
    return new Error('COUNT type error ,INCREMENT or DECREMENT');
  }
  return {
    type: type
  }
  
}