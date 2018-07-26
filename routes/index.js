const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const md5 = require('md5');
const helperFunctions = require('../helper/helper');

/* GET home page. */
router.get('/', function(req, res, next) {
  const method = 'CreateSession';
  const timeStamp = helperFunctions.currentTime();
  const signature = md5(`${process.env.DEV_ID}${method}${process.env.AUTH_KEY}${timeStamp}`);
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
