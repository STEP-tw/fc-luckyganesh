const { PARSER , DATA , END , EMPTY , MIME_TEXT_PLAIN, MIME_TYPES} = require('./constants.js')

const { readArgs } = require(PARSER);

const logRequest = (console, req, res, next) => {
  console.log(req.method, req.url);
  next();
}

const readBody = (req, res, next) => {
  let data = EMPTY;
  req.on(DATA, chunk => data += chunk);
  req.on(END, () => {
    req.body = data
    next();
  });
}

const addPrefix = url => `./public${url}`;

const getExtension = function(fileName) {
  return fileName.split('.').pop();
}

const getType = function (fileName) {
  const type = getExtension(fileName);
  return MIME_TYPES[type] || MIME_TEXT_PLAIN;
}

const resolveFileName = (url) => {
  if (url == "/") url = '/index.html';
  return addPrefix(url);
}

module.exports = {
  logRequest,
  readBody,
  addPrefix,
  resolveFileName,
  getType
}
