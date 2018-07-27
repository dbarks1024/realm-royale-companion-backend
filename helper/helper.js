const moment = require('moment');
const md5 = require('md5');
const rp = require('request-promise');

const currentTime = () => {
  return moment.utc().format('YYYYMMDDHHmmss');
};

const createSignature = (method) => {
  return md5(`${process.env.DEV_ID}${method}${process.env.AUTH_KEY}${currentTime()}`);
};

//put these in a class?
const createSession = () => {
  const method = 'createsession';
  const url = `http://api.realmroyale.com/realmapi.svc/${method}JSON/${process.env.DEV_ID}/${createSignature(method)}/${currentTime()}`;

  return new Promise((resolve, reject) => {
    rp(url)
      .then((response) => {
        resolve(JSON.parse(response));
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

const getLeaderboard = (sessionId, queueId, rankingCriteria) => {
  const method = 'getleaderboard';
// queueId = 474; 
// ID	Name	In-game name
// 474	Solo	LIVE Solo
// 475	Duo	LIVE Duo
// 476	Quad	LIVE Quad

// rankingCriteria 
// ID	Description
// 1	Team Wins
// 2	Team Average Placement (shown below)
// 3	Individual Average Kills
// 4	Winrate
  const url = `http://api.realmroyale.com/realmapi.svc/${method}JSON/${process.env.DEV_ID}/${createSignature(method)}/${sessionId}/${currentTime()}/${queueId}/${rankingCriteria}`;

  return new Promise((resolve, reject) => {
    rp(url)
      .then((response) => {
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
  createSession,
  getLeaderboard
};