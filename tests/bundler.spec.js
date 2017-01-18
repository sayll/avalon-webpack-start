import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
global.chai   = chai;
global.expect = chai.expect;