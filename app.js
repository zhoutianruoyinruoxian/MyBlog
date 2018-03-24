

var fs = require('fs')
var express = require('express');
var app = express();
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


var server = app.listen(8085,function(){
	var host = server.address().address;
	var port = server.address().address;
	console.log('Example app listening at http://%s:%s', host, port);
})