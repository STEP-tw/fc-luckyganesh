const {
  UTILS,
  COMMENTS_FILE,
  COMMENTS_HANDLER,
  SEND_HANDLER,
  EXPRESS,
  FILE_HANDLER,
  GUEST_BOOK_URL
} = require('./constants.js');

const fs = require('fs');

const { send } = require(SEND_HANDLER);

const Express = require(EXPRESS).Express;

const { uploadData, serveFile } = require(FILE_HANDLER);

const app = new Express();

const { Comments, readCommentsJson } = require(COMMENTS_HANDLER);

const comments = new Comments();

const { logRequest, readBody, getType } = require(UTILS);

const commentsJSON = readCommentsJson(fs,COMMENTS_FILE)
comments.addMultipleComments(commentsJSON);

const fileHandler = serveFile.bind(null, fs);

const giveComments = function(req,res){
  let contentType = getType(req.url);
  let commentsJSON = comments.toString();
  send(res,200,commentsJSON,contentType);
  return ;
}

app.use(logRequest.bind(null, console));
app.use(readBody)
app.get('/comments.json',giveComments);
app.post('/uploadData', uploadData.bind(null, fs, comments));
app.use(fileHandler);
// Export a function that can act as a handler

module.exports = app.requestHandler.bind(app);
