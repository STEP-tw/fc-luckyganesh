const { PARSER , DATA , END , EMPTY } = require('./constants.js')

const { readArgs } = require(PARSER);

const logRequest = (console, req, res, next) => {
  console.log(req.method, req.url);
  next();
}

const readBody = (req, res, next) => {
  let data = EMPTY;
  req.on(DATA, chunk => data += chunk);
  req.on(END, () => {
    req.body = readArgs(data)
    next();
  });
}

const addHtmlFormat = (content) => {
  content = `<tr><td>${content.date.toLocaleString()}</td><td>${content.name}</td><td>${content.comment}</td></tr>`
  return content;
}

const makeHtmlFormat = (htmlText,x) => addHtmlFormat(x) + htmlText;

const readComments = (comments) => {
  const commentData = comments.getComments();
  return commentData.reduce( makeHtmlFormat , EMPTY );
}

const addPrefix = url => `./public${url}`;

const resolveFileName = (url) => {
  if (url == "/") url = '/index.html';
  return addPrefix(url);
}

module.exports = {
  logRequest,
  readBody,
  addHtmlFormat,
  readComments,
  addPrefix,
  resolveFileName,
  makeHtmlFormat
}
