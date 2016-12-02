class method {
	constructor() {
		
	}
	
	getUrlStr(name) {
		let [url,theRequest] = [location.search, new Object()];
		if (url.indexOf("?") != -1) {
			let [str,strs] = [url.substr(1), str.split("&")];
			for (var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
			}
		}
		return theRequest[name];
	}
	
	getHashStr(name) {
		var [url,theRequest] = [location.hash, new Object()];
		if (url.indexOf("?")) {
			let [str,strs] = [url.substr(url.indexOf("?") + 1), str.split("&")];
			for (var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
			}
		}
		return theRequest[name];
	}
}

export {method as default}