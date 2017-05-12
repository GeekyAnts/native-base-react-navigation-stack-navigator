'use strict';
const fs = require('fs');
const pify = require('pify');
const fsP = pify(fs);
const fsReadP = pify(fs.read, {multiArgs: true});

module.exports = (filepath, pos, len) => {
	const buf = new Buffer(len);

	return fsP.open(filepath, 'r')
		.then(fd =>
			fsReadP(fd, buf, 0, len, pos)
				.then(readArgs => fsP.close(fd)
					.then(() => readArgs))
		)
		.then(readArgs => {
			// TODO: use destructuring when Node.js 6 is target
			const bytesRead = readArgs[0];
			let buf = readArgs[1];

			if (bytesRead < len) {
				buf = buf.slice(0, bytesRead);
			}

			return buf;
		});
};

module.exports.sync = (filepath, pos, len) => {
	let buf = new Buffer(len);

	const fd = fs.openSync(filepath, 'r');
	const bytesRead = fs.readSync(fd, buf, 0, len, pos);

	fs.closeSync(fd);

	if (bytesRead < len) {
		buf = buf.slice(0, bytesRead);
	}

	return buf;
};
