const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const md5 = require('md5');
const { currentTime } = require('../helper/helper');

/* GET home page. */
router.get('/', function(req, res) {
  const method = 'createsession';
  const timeStamp = currentTime();
  const devId = process.env.DEV_ID;
  const authKey = process.env.AUTH_KEY;
  console.log(currentTime());
  const signature = md5(`${devId}${method}${authKey}${timeStamp}`);
  console.log(process.env.AUTH_KEY);
  const url =  `http://api.realmroyale.com/realmapi.svc/${method}JSON/${process.env.DEV_ID}/${signature}/${timeStamp}`;
  
  rp(url)
  .then((response) => {
    return JSON.parse(response);
  })
  .then((response) => {
    res.json(response);
  })
  .catch((error) => {
    console.log(error);
  });

});

module.exports = router;
