const fs = require('fs');
const mysql = require('../db/util.js');

module.exports = function (req,res) {
  console.log(req.body,333)
  res.send(200)
}