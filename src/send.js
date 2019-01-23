const { FILE_ERROR } = require('./constants.js')

const send = function (res, statusCode, content, contentType) {
  res.setHeader('Content-Type', contentType);
  res.statusCode = statusCode;
  res.write(content);
  res.end();
  return;
}

const sendNotFound = function (req, res) {
  send(res, 404, FILE_ERROR,'text/plain');
}

const sendResponse = function (req, res, contentType, err, content) {
  if (!err) {
    send(res, 200, content, contentType);
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