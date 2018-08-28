const mysql = require('mysql');

let client = mysql.createConnection({
  user: 'root',
  password: '9468abcd',
});

client.connect(err => {
  if (err) {
    console.log("链接失败");
    throw (err);
  } else {
    console.log("链接成功");
  }
});
let operate = {
  database: '',
  table: '',
  //选择数据库
  use(name) {
    if (!name) {
      console.error('数据库名称不能为空，选择失败');
      return
    }
    client.query(`use ${name}`);
    this.database = name;
    return this;
  },
  creatDatabase(name) {
    if (!name) {
      console.error('数据库名称不能为空，创建失败');
      return
    } 
    client.query(`CREATE DATABASE ${name}`, (err, result) => {
      if (err) {
        throw err
      } else {
        this.database = name;
        console.log(`${name} 创建成功`);
      }
    });
    return this;
  },
  //选择表格
  selectTable(name) {
    if (!name) {
      console.error('表格名称不能为空，选择失败');
      return
    } else {
      this.table = name;
      console.log(`当前选中 ${name}`);
      return this;
    }
  },
  creatTable(name, data) {
    if (!name) {
      console.error('表格名称不能为空，创建失败');
      return
    }
    client.query(`CREATE TABLE ${name} (${data})`, (err, result) => {
      if (err) {
        throw err
      } else {
        this.table = name;
        console.log(`${name} 创建成功`);
      }
    });
    return this;
  },
  update(data) {

  },
  insert(data) {
    let key = [], value = [];
    Object.keys(data).foreEach(item=>{
      key.push(item);
      value.push(`'${data[item]}'`);
    })
    key = key.join(', ');
    value = value.join(', ');
    client.query(`INSERT INTO ${this.table} (${key}) VALUES (${value})`, (err, result) => {
      if (err) {
        throw err
      } else {
        console.log(`${this.table} 更新成功`);
      }
    });
    return this;
  },
  select({ column = '*', clause, offset, limit, success }) {
    let query = `SELECT ${column} FROM ${this.table}`;
    clause && (query += ` WHERE ${clause}`);
    offset && (query += ` OFFSET ${offset}`);
    limit && (query += ` LIMIT ${limit}`);
    client.query(query, (err, result) => {
      if (err) {
        throw err
      } else {
        console.log(`选择成功`);
        success && success(result);
      }
    });
    return this;
  }
}
module.exports = operate;