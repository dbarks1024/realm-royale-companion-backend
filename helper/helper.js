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

const getLeaderboard = (queueId, rankingCriteria) => {
  const method = 'getleaderboard';

  return new Promise((resolve, reject) => {
    createSession()
    .then((session) => {
      const url = `http://api.realmroyale.com/realmapi.svc/${method}JSON/${process.env.DEV_ID}/${createSignature(method)}/${session.session_id}/${currentTime()}/${queueId}/${rankingCriteria}`;
      rp(url)
      .then((response) => {
        resolve(JSON.parse(response));
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
    });
  });
};

const searchPlayers = (playerId) => {
  const method = 'searchplayers';
  
  return new Promise((resolve, reject) => {
    createSession()
    .then((session) => {
      const url = `http://api.realmroyale.com/realmapi.svc/${method}JSON/${process.env.DEV_ID}/${createSignature(method)}/${session.session_id}/${currentTime()}/${playerId}`;
      rp(url)
        .then((response) => {
          resolve(JSON.parse(response));
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    })
    .catch((error) =>{
      console.log(error);
    });
  });
};

const getPlayer = () => {

};

const getPlayerStats = () => {

};

const getPlayerMatchHistory = () => {

};

const getPlayerStatus = () => {

};

const getMatchIdsByQueue = () => {

};

const getMatchDetails = () => {

};

module.exports = {
  createSession,
  getLeaderboard,
  searchPlayers,
  getPlayer,
  getPlayerStats,
  getPlayerMatchHistory,
  getPlayerStatus,
  getMatchIdsByQueue,
  getMatchDetails,
};