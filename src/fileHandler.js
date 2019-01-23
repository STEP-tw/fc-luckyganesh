const { UTILS, SEND_HANDLER, COMMENTS_FILE, MIME_TYPES } = require('./constants.js');

const { resolveFileName , getType } = require(UTILS);

const { sendResponse } = require(SEND_HANDLER);

const uploadData = function (fs, comments, req, res) {
  const body = JSON.parse(req.body);
  body.name = req.cookie.userName;
  body.date = new Date();
  const comment = body;
  comments.addComment(comment);
  fs.writeFile(COMMENTS_FILE, comments.toString(), (err) => {
    if (err) { console.log(err); return; };
  });
  res.end();
}

const serveFile = function (fs, req, res) {
  const path = resolveFileName(req.url);
  serveFileContent(fs, req,res, path);
}

const serveFileContent = function (fs,req, res, fileName) {
  const contentType = getType(fileName);
  fs.readFile(fileName, sendResponse.bind(null,req, res,contentType));
  return;
}

module.exports = {
  uploadData,
  serveFile,
  serveFileContent
}