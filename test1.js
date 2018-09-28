const Koa = require('koa');
let app = new Koa();

const middleware1 = async (ctx, next) => { 
  console.log(1); 
  await next();  
  console.log(6);   
}

const middleware2 = async (ctx, next) => { 
  console.log(2); 
  await next();  
  console.log(5);   
}

const middleware3 = async (ctx, next) => { 
  console.log(3); 
  await next();  
  console.log(4);   
}

app.use(middleware1);
app.use(middleware2);
app.use(middleware3);
app.use(async(ctx, next) => {
  ctx.body = 'hello world'
})

app.listen(3001)
