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

const GuestBook = require('./guestBook.js');

const guestBookTemplate = fs.readFileSync('./src/templates/guest_book.html','utf8');
const loginFormTemplate = fs.readFileSync('./src/templates/login_form.html','utf8');
const commentsFormTemplate = function(name){
  return `<form id="form" method="POST" action="/logout">
  <h1 id="formTitle">Leave a comment</h1>
  <div id="nameInput">
    Name: ${name} <input type="submit" value="logout" />
  </div>
  <div id="commentInput">
    Comment:<textarea rows="4" cols="30" name="comment"></textarea>
  </div>
  <input type="button" value="submit" onclick="submitForm()" />
</form>`
}

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

const guestBookHandler = function(req,res){
  const guestBook = new GuestBook(guestBookTemplate);
  let form = loginFormTemplate;
  let { cookie } = req;
  if(cookie.userName != undefined){
    form = commentsFormTemplate(cookie.userName);
  }
  guestBook.replaceForm(form);
  send(res,200,guestBook.getBook(),'text/html');
}

const readCookies = function(req, res, next) {
  const cookie = req.headers["cookie"];
  let cookies = {};
  if (cookie) {
    cookie.split(";").forEach(element => {
      let [name, value] = element.split("=");
      name = name.trim();
      cookies[name] = value;
    });
  }
  req.cookie = cookies;
  next();
};

const loginHandler = function(req, res) {
  let name = req.body.split("=")[1];
  res.setHeader("Set-Cookie", `userName=${name}`);
  res.writeHead(302, {
    Location: GUEST_BOOK_URL
  });
  res.end();
};

const logoutHandler = function(req, res) {
  const expireTime = "expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  res.setHeader("Set-Cookie", `userName=;${expireTime}`);
  res.writeHead(302, {
    Location: GUEST_BOOK_URL
  });
  res.end();
}

app.use(logRequest.bind(null, console));
app.use(readBody);
app.use(readCookies);
app.post('/login',loginHandler);
app.post('/logout',logoutHandler);
app.get(GUEST_BOOK_URL,guestBookHandler);
app.get('/comments.json',giveComments);
app.post('/uploadData', uploadData.bind(null, fs, comments));
app.use(fileHandler);
// Export a function that can act as a handler

module.exports = app.requestHandler.bind(app);
