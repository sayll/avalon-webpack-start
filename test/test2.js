import add from '../lib/index.js';

var chai = require('chai');
var expect = chai.expect;
describe('求和', function() {
	it('1 + 1 条件改变 = 233', function() {
		expect(add(1,1)).to.be.equal(233);
	});
});