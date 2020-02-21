const path = require('path');
const { writeLog } = require('m2-nodejs');
const env = process.env.NODE_ENV;

const write = (fileName, log) => {
  if (env !== 'development') {
    fileName = path.join(__dirname, '../../log', fileName);
    writeLog(fileName, log);
  } else {
    console.log(log);
  }
};

module.exports = {
  accessLog: (log) => write('access.log', log),
  eventLog: (log) => write('event.log', log),
  errorLog: (log) => write('error.log', log)
};
