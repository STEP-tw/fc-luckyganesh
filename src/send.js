const { FILE_ERROR } = require('./constants.js')

const send = function (res, statusCode, content) {
  res.statusCode = statusCode;
  res.write(content);
  res.end();
  return;
}

const sendNotFound = function (req, res) {
  send(res, 404, FILE_ERROR);
}

const sendResponse = function (res, err, content) {
  if (!err) {
    send(res, 200, content);
    return;
  }
  sendNotFound(req, res);
  return;
}

module.exports = {
  send,
  sendNotFound,
  sendResponse
}