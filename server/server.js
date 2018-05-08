const mysql = require('../db/util.js');

module.exports = function (req,res) {
	var data ={
		result: "1",
		retVal: {
			name: "server",
			user: "zhoutian",
		}
	};
	res.send(data);
}