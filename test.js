const url = require('url');

const { URL } = require('url');
const myURL = new URL({ toString: () => 'https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash' });
console.log(myURL);
const my =
  url.parse('https://user:pass@sub.host.com:8080/p/a/t/h?query=string#hash');
  console.log(my)