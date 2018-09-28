const Koa = require('koa');
const app = new Koa();
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;



app.use(async ctx => {
  ctx.body = process.pid+'进程正在运行';
});

if (cluster.isMaster) {
  console.log('主进程' + process.pid + '正在运行');
  // cluster.fork();
}
  app.listen(9999);



