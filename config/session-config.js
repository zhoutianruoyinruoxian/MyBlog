const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const config = require('./index.js');

const { database } = config;

// session存储配置
const sessionMysqlConfig = {
  user: database.user,
  password: database.password,
  database: database.database,
  host: database.host,
}

// 存放sessionId的cookie配置
const cookie = {
  maxAge: 60000, // cookie有效时长
  autoCommit: true, // (boolean) automatically commit headers (default true) 
  overwrite: true, // (boolean) can overwrite or not (default true)
  // expires: '',  // cookie失效时间
  // path: '/', // 写cookie所在的路径
  // domain: '', // 写cookie所在的域名
  httpOnly: '', // 是否只用于http请求中获取,true表示只有服务器端可以获取cookie （有待验证）
  overwrite: false,  // 是否允许重写
  // secure: true,
  signed: false,
  rolling: true,//在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false） 【需要修改】 */

}

module.exports = (app) => {
  return session({
    key: 'user_id',
    cookie,
    store: new MysqlStore(sessionMysqlConfig)
  }, app)
}
