const crypto = require('crypto');

const username = 'kiran';
const password = 'hello'
const key = username + password;

const token = '234njk234kjn234@j23k';

var enc = crypto.createCipher('aes-256-cfb', key).update(token, "utf8", 'hex');

console.log('Encrypte Toekn :: ',enc);

var dec = crypto.createDecipher('aes-256-cfb', key).update(enc,"hex", "utf8");

console.log('Decrypte Toekn :: ',dec);