const mysql = require('mysql');
const config = require('../config');

class Sql {
  constructor() {
  }
  query(sql, values) {
    return new Promise((resolve, reject) => {
      pool.getConnection((err, connection) => {
        if (err) {
          reject(err);
        } else {
          connection.query(sql, values, (error, results, fields) => {
            if (err) {
              reject(err);
            } else {
              resolve(results, fields);
            }
            connection.release();
          });
        }
      });
    });
  }
}
module.export = new Sql();