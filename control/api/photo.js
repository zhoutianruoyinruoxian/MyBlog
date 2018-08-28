const fs = require('fs');
const os = require('os');
const mysql = require('../db/util.js');
const util = require('../../util/index.js');
const ip = util.getIPAdress();
 


module.exports = function (req,res) {
  if(req.body.photo){
    const index = req.body.photo.indexOf(',') + 1;
    const img = req.body.photo.replace(/\%2B/g, "+").slice(index);
    decodeImg = new Buffer(img, 'base64');  // new Buffer(string, encoding)
    fs.writeFile('./public/images/avatar.jpg', decodeImg, function(err) {
      if(err) {
        console.log(err);
        return;
      }
      const data ={
        code: "200",
        message:'',
        data: {
          img:`${ip}:8085/public/images/avatar.jpg`
        }
      };
      res.set('Content-Type','text/plain');// 设置响应头
      res.send(data);
    });
  }else{
      const data ={
        code: "0",
        message:'param photo is required!',
        data: '',
      };
      res.set('Content-Type','text/plain');// 设置响应头
      res.send(data);
  }
}