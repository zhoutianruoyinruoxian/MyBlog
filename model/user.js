const Base = require('./base.js');
module.exports = class User extends Base {
  constructor() {
    super();
    this.table = 'user';
    this.model = `
      name VARCHAR(10) NOT NULL COMMENT '用户名',
      password VARCHAR(10) NOT NULL COMMENT '密码',
      avator VARCHAR(100) COMMENT '头像',
      create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
      last_login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后登录的时间',
      mobile INT COMMENT '手机号',
      age INT(2)  COMMENT '年龄',
      user_id INT(2) AUTO_INCREMENT NOT NUll COMMENT 'uuid',
      privilege SET('root','0','1') NOT NULL COMMENT '权限',
      PRIMARY KEY ( user_id )
      `
  }

  register(data) {
    return this.insert(data);
  }

  getDataByName(name) {
    return this.select(`SELECT * FROM ${this.table} WHERE name='${name}'`);
  }
}