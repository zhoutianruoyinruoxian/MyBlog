const UserModel = require('../model/user.js');
const user = new UserModel();
const Util = require('../util');
const util = new Util();


const login = async (ctx) => {
  const { name, password } = ctx.query;
  if (ctx.session.userinfo) {
      ctx.body = util.resReturn(null, 200, `${ctx.session.userinfo.name} 已登录，请勿重复登录`);
      return;
  }
  let data = await user.getDataByName(name);
  if (data.length === 0) {
    ctx.body = util.resReturn(null, 200, '用户名不存在');
    return;
  }
  data = data[0];
  ctx.session && (ctx.session.userinfo = data);  
  if (data.password === password) {
    ctx.body = util.resReturn(null, 200, '登陆成功');
  } else {
    ctx.body = util.resReturn(null, 500, '用户名或密码错误');
  }
}

const register = async (ctx) => {
  const { name, password, confirmPassword, avator = null, mobile = null, age = null } = ctx.request.body;

  if (!name) {
    ctx.body = util.resReturn(null, 500, '用户名不能为空');
    return;
  }

  if (!password || !confirmPassword) {
    ctx.body = util.resReturn(null, 500, '密码不能为空');
    return;
  }

  const getName = await user.getDataByName(name);
  if (getName.length > 0) {
    ctx.body = util.resReturn(null, 500, '该用户名已存在');
    return;
  }

  if (password !== confirmPassword) {
    ctx.body = util.resReturn(null, 500, '两次输入的密码不一致');
    return;
  }

  const data = {
    name,
    password,
    avator,
    mobile,
    age,
    privilege: '0',
  }

  await user.insert(data)
  ctx.body = util.resReturn(null, 200, '注册成功');
}

module.exports = async (ctx) => {
  switch (ctx.method) {
    case 'GET':
      await login(ctx);
      break;
    case 'POST':
      await register(ctx);
      break;
    case 'OPTIONS':
      ctx.status = 200;
      break;
    default:
      throw new Error('method error!');
  }
}