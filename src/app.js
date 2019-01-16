const fs = require('fs');

const SERVER_ERROR = '500: Internal server Error';
const FILE_ERROR = '400 : file not found';

const send = function (res, statusCode, content) {
  res.statusCode = statusCode;
  res.write(content);
  res.end();
  return;
}

const giveResponse = function(res,err,content){
  let statusCode = 500;
  let data = SERVER_ERROR;
  if (!err) {
    statusCode = 200;
    data = content;
  }
  if (err != null) {
    statusCode = 400;
    data = FILE_ERROR;
  }
  send(res,statusCode,data);
  return;
}

const readFileContent = function (res, fileName) {
  fs.readFile(fileName, giveResponse.bind(null,res));
  return;
}

const defaultPaths = {
  '/' : "/index.html"
}

const resolveFileName = function (url) {
  let path = url;
  path = defaultPaths[url] || url;
  path = "./html_page" + path;
  return path;
}

const app = (req, res) => {
  const path = resolveFileName(req.url);
  readFileContent(res, path);
};

// Export a function that can act as a handler

module.exports = app;
