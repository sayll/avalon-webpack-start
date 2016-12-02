import method from './method';
import www from './www';
import api from './api';
import _ from './lodash';

const cfg = {
	method: new method(),
	url   : new www(),
	api   : new api()
	//ie : window.ActiveXObject || "ActiveXObject" in window,
}

export {cfg, _};
