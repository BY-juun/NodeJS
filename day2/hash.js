const url = require('url');
const querystring = require('querystring');

const parsedUrl = url.parse('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
const query = querystring.parse(parsedUrl.query);
console.log('querystring.parse():',query); 
console.log('querystring.stringfy():',querystring.stringify(query));

const crypto = require('crypto');

console.log('base64: ',crypto.createHash('sha512').update('비밀번호').digest('base64'));
console.log('hex: ',crypto.createHash('sha512').update('비밀번호').digest('hex'));
console.log('base64: ',crypto.createHash('sha512').update('다른 비밀번호').digest('base64'));