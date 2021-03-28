export function firstChar(str) {
	const tmp = str.split(' ');
	if (tmp.length == 1) {
		return str.substr(0, 2).toUpperCase()
	} else {
		var matches = str.match(/\b(\w)/g);
		var acronym = matches.join("");
		return acronym.toUpperCase();
	}

}
