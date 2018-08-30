const Koa = require('koa');
const app = new Koa();
const UserModel = require('./model/user.js');
const user = new UserModel();

async function a(ctx){
  await user.login(ctx.query.name).then((data) => {
    const ddd = {...data[0]};
    console.log(ddd,333)
    ctx.body = ddd;
   })
}

app.use(async ctx => {
  await a(ctx);
  // ctx.body = 'Hello33';
});

app.listen(9999);