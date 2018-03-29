const mysql = require('../db/util.js');
mysql.use('user').selectTable('user_tb');	

module.exports = function(req,res){
	// let data = req.query.name ? {
	// 	"result": 1,
	// 	"retVal": {
	// 		"name": "demo",
	// 		"user": "zhoutian"
	// 	}
	// } : {
	// 	"result": 0,
	// 	"msg": "params name is required!"
	// }
	// 			res.send(data)
	let data;
	if(req.query.name){
		mysql.select({
			// clause: `name='${req.query.name}'`,
			sucess(result){
				console.log(result)
				data = {
					"result": 1,
					"retVal": result
				} 
				res.send(data)
			}
		})
	}else{
		data = {
			"result": 0,
			"msg": "params name is required!"
		}
		res.send(data)
	}
}