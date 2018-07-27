const express = require('express');
const router = express.Router();

const {
  createSession,
  getLeaderboard,
  searchPlayers
} = require('../helper/helper');

/* GET home page. */
router.get('/', function (req, res) {
  createSession()
    .then((response) => {
      getLeaderboard(response.session_id)
        .then((leaderboard) => {
          res.json(leaderboard);
        });
    });
});

//post request to get leaderboard - send queueId & rankingCriteria
router.post('/leaderboard', function (req, res) {
  getLeaderboard(req.body.queueId, req.body.rankingCriteria)
    .then((leaderboards) => {
      res.json(leaderboards);
    });
});

// needs playerId
router.post('/search-players', function (req, res) {
  searchPlayers(req.body.playerID)
    .then((leaderboards) => {
      res.json(leaderboards);
    });
});

module.exports = router;