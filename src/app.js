const {
  UTILS,
  COMMENTS_FILE,
  COMMENTS_HANDLER,
  EXPRESS,
  FILE_HANDLER,
  GUEST_BOOK_URL
} = require('./constants.js');

const fs = require('fs');

const Express = require(EXPRESS).Express;

const { serveGuestBook, uploadData, serveFile, } = require(FILE_HANDLER);

const app = new Express();

const { Comments, readCommentsJson } = require(COMMENTS_HANDLER);

const comments = new Comments();

const { logRequest, readBody } = require(UTILS);

const commentsJSON = readCommentsJson(fs,COMMENTS_FILE)
comments.addMultipleComments(commentsJSON);

const fileHandler = serveFile.bind(null, fs);

app.use(logRequest.bind(null, console));
app.use(readBody);
app.get(GUEST_BOOK_URL, serveGuestBook.bind(null, fs, comments));
app.post(GUEST_BOOK_URL, uploadData.bind(null, fs, comments));
app.use(fileHandler);
// Export a function that can act as a handler

module.exports = app.requestHandler.bind(app);
