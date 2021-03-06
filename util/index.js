module.exports = class Util {
  getIPAdress() {
    const interfaces = require('os').networkInterfaces();
    for (let devName in interfaces) {
      let iface = interfaces[devName];
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i];
        if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
          return alias.address;
        }
      }
    }
  }

  /**
   * @desc 请求返回的对象
   * @param {object|array|json} data 
   * @param {number} code 
   * @param {string} message 
   */
  resReturn(data = {}, code = 200, message = '') {
    return {
      code,
      data,
      message,
    }
  }
}