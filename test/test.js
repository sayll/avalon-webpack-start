import add from '../lib/index.js';

var chai = require('chai');
var expect = chai.expect;
describe('求和', function() {
	it('2 + 1 = 3', function() {
		expect(add(2,1)).to.be.equal(3);
	});
});