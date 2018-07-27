const moment = require('moment');
const md5 = require('md5');
const rp = require('request-promise');

const currentTime = () => {
  return moment.utc().format('YYYYMMDDHHmmss');
};

const createSignature = (method) => {
  return md5(`${process.env.DEV_ID}${method}${process.env.AUTH_KEY}${currentTime()}`);
};
const createSession = () => {
  const method = 'createsession';
  const url = `http://api.realmroyale.com/realmapi.svc/${method}JSON/${process.env.DEV_ID}/${createSignature(method)}/${currentTime()}`;

  return new Promise((resolve, reject) => {
    rp(url)
      .then((response) => {
        console.log(response);
        resolve(JSON.parse(response));
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};


module.exports = {
  currentTime,
  createSignature,
  createSession
};