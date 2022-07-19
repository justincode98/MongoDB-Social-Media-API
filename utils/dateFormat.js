const moment = require('moment');

//exports timestap using momentjs
module.exports = (timestamp) => { 

  const formattedTimeStamp = moment(timestamp).format('MMMM Do YYYY, h:mm:ss a')

  return formattedTimeStamp;
};
