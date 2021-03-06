const express = require('express');
const router = express.Router();

const {
  createSession,
  getLeaderboard,
  searchPlayers
} = require('../helper/helper');

/* GET home page. */
router.get('/', function (req, res) {
  getLeaderboard(474, 4)
    .then((leaderboards) => {
      res.json(leaderboards.leaderboard_details);
    });
});

//post request to get leaderboard - send queueId & rankingCriteria
router.post('/leaderboard', function (req, res) {
  getLeaderboard(req.body.queueId, req.body.rankingCriteria)
    .then((leaderboards) => {
      res.json(leaderboards.leaderboard_details);
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