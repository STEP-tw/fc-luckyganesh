const fs = require('fs');

const Express = require('./express').Express;

const FILE_ERROR = '400 : not found';

const app = new Express();

const { Comments } = require('./comment');

const comments = new Comments();

fs.readFile('./src/commenters_data.json',(err,data) => {
  if(err){
    console.log(err);
    return;
  } 
  data = JSON.parse(data);
  data.forEach(comment => comments.addComment(comment));
});

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

const logRequest = function (req, res, next) {
  console.log(req.method, req.url);
  next();
}

const sendNotFound = function (req, res) {
  send(res, 404, FILE_ERROR);
}

const resolveFileName = function (path) {
  if (path == "/") {
    path = '/index.html';
  }
  return `./public${path}`
}

const serveFile = function (req, res) {
  const path = resolveFileName(req.url);
  serveFileContent(res, path);
}

const readArgs = content => {
  let args = {};
  const splitKeyValue = pair => pair.split("=");
  const assignKeyValueToArgs = ([key, value]) => (args[key] = value);
  content
    .split("&")
    .map(splitKeyValue)
    .forEach(assignKeyValueToArgs);
  return args;
};

const readBody = function (req, res, next) {
  let data = "";
  req.on("data", chunk => data += chunk);
  req.on("end", () => {
    req.body = readArgs(data)
    next();
  });
}

const addHtmlFormat = function (content) {
  content = `<tr><td>${content.date}</td><td>${content.name}</td><td>${content.comment}</td></tr>`
  return content;
}

const readComments = function (comments) {
  let html = "";
  commentData = comments.getComments();
  commentData.forEach(x => { html = addHtmlFormat(x) + html });
  return html;
}

const serveGuestBook = function (req, res) {
  fs.readFile('./public/guest_book.html', (err, data) => {
    let html = data;
    html += readComments(comments);
    send(res,200,html);
  })
}

const uploadData = function (req, res) {
  let comment = req.body;
  comment.date = new Date().toLocaleString();
  comments.addComment(comment);
  fs.writeFile('./src/commenters_data.json', comments.toString() , (err) => {
    if (err) { console.log(err); return; };
  })
  serveGuestBook(req, res);
}

app.use(logRequest);
app.use(readBody);
app.get('/', serveFile);
app.get('/index.html',serveFile);
app.get('/favicon.ico', serveFile);
app.get('/images/freshorigins.jpg', serveFile);
app.get('/Abeliophyllum.pdf',serveFile)
app.get('/Agerantum.pdf',serveFile)
app.get('/images/animated-flower-image-0021.gif', serveFile);
app.get('/main.js', serveFile);
app.get('/style.css', serveFile);
app.get('/agerantum.html',serveFile);
app.get('/images/agerantum.jpg',serveFile);
app.get('/images/abeliophyllum.jpg',serveFile);
app.get('/abeliophyllum.html',serveFile);
app.get('/guest_book.html', serveGuestBook);
app.post('/guest_book.html', uploadData);
app.use(sendNotFound);
// Export a function that can act as a handler

module.exports = app.requestHandler.bind(app);
