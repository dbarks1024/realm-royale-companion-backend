const express = require('express');
const router = express.Router();

const { createSession } = require('../helper/helper');

/* GET home page. */
router.get('/', function(req, res) {
  const method = 'ping';
  const url =  `http://api.realmroyale.com/realmapi.svc/${method}JSON`;
  
  createSession()
  .then((sesresponsesion) => {
    res.json(response);
  });
});

module.exports = router;
