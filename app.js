

const fs = require('fs')
const express = require('express');
const app = express();
require('./test.js')
// app.get('*',function(req,res){
// 	console.log(req.path)
// 	fs.readFile("/myblog/"+req.path, function (err, data) {
// 	   if (err) {
// 	       return console.error(err);
// 	   }
//         res.send(JSON.parse());
// 	});
// })

/**解决跨域问题*/
// app.all('*',function (req, res, next) {
//     if (req.method == 'OPTIONS') {
//         res.send(200); /让options请求快速返回/
//     }
//     else {
//     	fs.readFile("/myblog/"+req.path, function (err, data) {
// 		   	if (err) {
// 		       	return console.error(err);
// 		  	}
// 		  	res.send(JSON.parse(data));
// 		});
//     }
// });
app.all('/server/*',function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    require('./'+req.path+'.js')(req, res, next)
});


const server = app.listen(8800,function(){
	const host = server.address().address;
	const port = server.address().port;
	console.log('Example app listening at http://'+host+':'+port);
})