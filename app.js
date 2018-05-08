const fs = require('fs')
const express = require('express');
const path = require('path');
const url = require('url');
const app = express();

// 引入body-parser模块使得req.body可以使用
const bodyParser = require('body-parser');
// app.use(bodyParser());
// 设置上传限制
app.use(bodyParser.json({limit: '10mb'})); // for parsing application/json
app.use(bodyParser.urlencoded({limit: '10mb', extended: true }));

// require('./test.js')
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
// 打印request头部
app.get('/headers', function(req,res){
  res.set('Content-Type','text/plain');
  let s = '';
  for(let name in req.headers) {
    s += `${name}: ${req.headers[name]}\n`;
  }
  res.send(s);
  console.log(req.headers)
});
app.disable('x-powered-by');// response时禁用服务器的详细信息
// app.use(express.json({limit: '10mb'}));// 设置请求体大小


app.all('/server/*',function (req, res, next) {

    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    require('./'+req.path+'.js')(req, res, next)
});
app.get('/public/*',function (req, res, next) {
    res.sendFile(path.resolve(__dirname,`./${req.path}`));
});


const server = app.listen(8085,function(){
	const host = server.address().address;
	const port = server.address().port;
	console.log('Example app listening at http://'+host+':'+port);
})