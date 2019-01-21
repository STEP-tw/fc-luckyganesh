const { readComments, resolveFileName } = require('./utils.js');

const { send, sendNotFound, sendResponse } = require('./send.js');

const serveGuestBook = function (fs,comments, req, res) {
  fs.readFile('./public/guest_book.html', (err, data) => {
    if (err) {
      sendNotFound(req, res);
    }
    let html = data;
    html += readComments(comments);
    send(res, 200, html);
  })
}

const uploadData = function (fs,comments, req, res) {
  let comment = req.body;
  comment.date = new Date();
  comments.addComment(comment);
  fs.writeFile('./src/commenters_data.json', comments.toString(), (err) => {
    if (err) { console.log(err); return; };
  })
  serveGuestBook(fs, comments, req, res);
}

const serveFile = function (fs, req, res) {
  const path = resolveFileName(req.url);
  serveFileContent(fs, res, path);
}

const serveFileContent = function (fs, res, fileName) {
  fs.readFile(fileName, sendResponse.bind(null, res));
  return;
}

module.exports = {
  serveGuestBook,
  uploadData,
  serveFile,
  serveFileContent
}