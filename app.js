const fs = require('fs');
const url = require('url');
const path = require('path');
const Koa = require('koa');
const app = new Koa();

const bodyParser = require('koa-bodyparser'); // 引入body-parser模块使得req.body可以使用
// app.use(bodyParser());
// 设置上传限制
app.use(bodyParser({ jsonLimit: '10mb' })); // for parsing application/json
const Router = require('koa-router');

var router = new Router();
const config = require('./config');
const Util = require('./util');
const util = new Util();





// app.use(async (ctx, next) => {
//   if (ctx.path.indexOf('/api') === 0) {
//     // ctx.set('Cache-Control', 'max-age=8640000000');
//     ctx.set('Cache-Control', 'no-cache');

//   }
//   await next();
// });

app.use(router.all('/api/*', async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  ctx.method = ctx.method.toUpperCase();
  if (fs.existsSync('./control' + ctx.path.replace('/api', '') + '.js')) {
    await require('./control' + ctx.path.replace('/api', '') + '.js')(ctx)
  } else {
    ctx.status = 404;
    ctx.body = `can not found path: ${ctx.path}`;
  }
}).routes());
// app.use(router.get('/public/*',function (req, res, next) {
//     res.sendFile(path.resolve(__dirname,`./${req.path}`));
// }))


const server = app.listen(config.PORT, function () {
  // const host = server.address().address;
  const port = server.address().port;
  const ip = util.getIPAdress();
  console.log('Example app listening at http://' + ip + ':' + port);
})