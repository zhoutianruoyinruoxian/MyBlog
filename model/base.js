const mysql = require('mysql');
const config = require('../config');

const pool = mysql.createPool(config.database);

module.exports = class BaseModel {
  constructor() {

  }
  query(sql, values) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          connection.query(sql, values, (error, results, fields) => {
            if (error) {
              reject(error);
            } else {
              resolve(results, fields);
            }
            connection.release();
          });
        }
      });
    });
  }

  creatDatabase(dataBase) {
    return this.query(`create database ${dataBase} if not exists`);
  }

  createTable() {
    return this.query(`create table ${this.table} (${this.model})`);
    // return this.query(`create table if not exists ${this.table} (${this.model})`);
  }

  drop() {
    return this.query(`drop table ${this.table};`)
  }

  insert(data) {
    let key = [], value = [];
    Object.keys(data).forEach(item => {
      key.push(item);
      if (data[item] === null) {
        value.push('null');
      } else {
        value.push(`'${data[item]}'`);
      }
    })
    key = key.join(', ');
    value = value.join(', ');
    console.log(`INSERT INTO ${this.table} (${key}) VALUES (${value})`, 23232323)
    return this.query(`INSERT INTO ${this.table} (${key}) VALUES (${value})`);
  }

  // select( { column = '*', clause, offset, limit, success }) {
  //   let query = `SELECT ${column} FROM ${this.table}`;
  //   clause && (query += ` WHERE ${clause}`);
  //   offset && (query += ` OFFSET ${offset}`);
  //   limit && (query += ` LIMIT ${limit}`);
  //   return this.query(query);
  // }
  select(string) {
    return this.query(string);
  }

}