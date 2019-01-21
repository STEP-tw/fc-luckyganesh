const fs = require('fs');

const Express = require('./express').Express;

const { serveGuestBook, uploadData, serveFile, } = require('./fileHandler.js');

const app = new Express();

const { Comments, readCommentsJson } = require('./comment.js');

const comments = new Comments();

const { logRequest, readBody } = require('./utils.js');

const commentsJSON = readCommentsJson(fs)
comments.addMultipleComments(commentsJSON);

const fileHandler = serveFile.bind(null, fs);

app.use(logRequest.bind(null, console));
app.use(readBody);
app.get('/guest_book.html', serveGuestBook.bind(null, fs, comments));
app.post('/guest_book.html', uploadData.bind(null, fs, comments));
app.use(fileHandler);
// Export a function that can act as a handler

module.exports = app.requestHandler.bind(app);
