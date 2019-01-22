const { UTILS, SEND_HANDLER, COMMENTS_FILE, MIME_TYPES } = require('./constants.js');

const { resolveFileName , getType } = require(UTILS);

const { sendResponse } = require(SEND_HANDLER);

const uploadData = function (fs, comments, req, res) {
  const comment = JSON.parse(req.body);
  comment.date = new Date();
  comments.addComment(comment);
  fs.writeFile(COMMENTS_FILE, comments.toString(), (err) => {
    if (err) { console.log(err); return; };
  });
  res.end();
}

const serveFile = function (fs, req, res) {
  const path = resolveFileName(req.url);
  serveFileContent(fs, res, path);
}

const serveFileContent = function (fs, res, fileName) {
  const contentType = getType(fileName);
  fs.readFile(fileName, sendResponse.bind(null, res,contentType));
  return;
}

module.exports = {
  uploadData,
  serveFile,
  serveFileContent
}