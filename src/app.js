const fs = require('fs');

const Express = require('./express').Express;

const FILE_ERROR = '400 : not found';

const app = new Express();

const send = function (res, statusCode, content) {
  res.statusCode = statusCode;
  res.write(content);
  res.end();
  return;
}

const giveResponse = function (res, err, content) {
  if (!err) {
    send(res, 200, content);
    return;
  }
  send(res, 404, FILE_ERROR)
  return;
}

const serveFileContent = function (res, fileName) {
  fs.readFile(fileName, giveResponse.bind(null, res));
  return;
}

const logRequest = function(req,res,next){
  console.log(req.method,req.url);
  next();
}

const sendNotFound = function(req,res){
  send(res,404,FILE_ERROR);
}

const resolveFileName = function(path){
  if(path == "/"){
    path = '/index.html';
  }
  return `./public${path}`
}

const serveFile = function(req,res){
  const path = resolveFileName(req.url);
  serveFileContent(res,path);
}

app.use(logRequest);
app.get('/',serveFile);
app.get('/favicon.ico',serveFile);
app.get('/images/freshorigins.jpg',serveFile);
app.get('/images/animated-flower-image-0021.gif',serveFile);
app.get('/main.js',serveFile);
app.get('/style.css',serveFile);
app.use(sendNotFound);
// Export a function that can act as a handler

module.exports = app.requestHandler.bind(app);
