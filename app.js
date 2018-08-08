const fs = require('fs');
const url = require('url');
const path = require('path');
const Koa = require('koa');
const app = new Koa();

const bodyParser = require('koa-bodyparser'); // 引入body-parser模块使得req.body可以使用
// app.use(bodyParser());
// 设置上传限制
app.use(bodyParser({ jsonLimit: '10mb' })); // for parsing application/json
const router = require('koa-route');

const defalutOption = require('./config/index.js');
const util = require('./util/index.js');
// app.use(bodyParser.urlencoded({limit: '10mb', extended: true }));

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
// app.use(router.get('/headers', function(req,res){
//   res.set('Content-Type','text/plain');
//   let s = '';
//   for(let name in req.headers) {
//     s += `${name}: ${req.headers[name]}\n`;
//   }
//   res.send(s);
//   console.log(req.headers)
// }));

// app.disable('x-powered-by');// response时禁用服务器的详细信息
// app.use(express.json({limit: '10mb'}));// 设置请求体大小


app.use(router.all('/api/*', function (ctx, next) {

  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (fs.existsSync('./server' + ctx.path + '.js')) {
    require('./server' + ctx.path + '.js')(ctx)
  } else {
    ctx.status = 404;
    ctx.body = `can not found path: ctx.path`;
  }
}));
// app.use(router.get('/public/*',function (req, res, next) {
//     res.sendFile(path.resolve(__dirname,`./${req.path}`));
// }))


const server = app.listen(defalutOption.PORT, function () {
  // const host = server.address().address;
  const port = server.address().port;
  const ip = util.getIPAdress();
  console.log('Example app listening at http://' + ip + ':' + port);
})