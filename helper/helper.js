const moment = require ('moment');
const md5 = require('md5');

const currentTime = () => {
  return moment.utc().format('YYYYMMDDHHmmss');
};

const createSignature = (method) => {
  return md5(`${process.env.DEV_ID}${method}${process.env.AUTH_KEY}${currentTime()}`);
};

module.exports = { currentTime, createSignature };