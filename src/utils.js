const { readArgs } = require('./parse');

const logRequest = function (console, req, res, next) {
  console.log(req.method, req.url);
  next();
}

const readBody = function (req, res, next) {
  let data = "";
  req.on("data", chunk => data += chunk);
  req.on("end", () => {
    req.body = readArgs(data)
    next();
  });
}

const addHtmlFormat = function (content) {
  content = `<tr><td>${content.date.toLocaleString()}</td><td>${content.name}</td><td>${content.comment}</td></tr>`
  return content;
}

const readComments = function (comments) {
  let html = "";
  commentData = comments.getComments();
  commentData.forEach(x => { html = addHtmlFormat(x) + html });
  return html;
}

const addPrefix = url => `./public${url}`;

const resolveFileName = function (url) {
  if (url == "/") url = '/index.html';
  return addPrefix(url);
}

module.exports = {
  logRequest,
  readBody,
  addHtmlFormat,
  readComments,
  addPrefix,
  resolveFileName
}
