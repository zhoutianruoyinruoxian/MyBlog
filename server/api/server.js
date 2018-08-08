// const mysql = require('../db/util.js');
module.exports = function (ctx) {
	var data = {
		code: 200,
		retVal: {
			name: "server",
			user: "zhoutian",
		}
	};
	ctx.body = data;
}