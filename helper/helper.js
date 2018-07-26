const moment = require ('moment');

const currentTime = () => {
  return moment.utc().format('YYYYMMDDHHmmss');
};

module.exports = { currentTime };