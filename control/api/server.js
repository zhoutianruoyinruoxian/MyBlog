const client = require('../../db/util.js');
module.exports = (ctx) => {

	let data ;
	client.use('test').selectTable('user').select({success(res){
		data = res;
	}});
	console.log(data,444)
	var res = {
		code: 200,
		data:data,
	};
	ctx.body = res;
}