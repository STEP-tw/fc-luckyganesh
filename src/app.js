const fs = require('fs');

const readFiles = function(res,fileName){
  fs.readFile(fileName,(err,data) => {
    if(err){
      res.statusCode = 400;
      res.end();
      return ;
    }
    res.statusCode = 200;
    res.write(data);
    res.end();
  });
}

const app = (req, res) => {
  let path = req.url;
  if(path === "/"){
    path = path+"index.html";
  }
  path = "./html_page" + path
  readFiles(res,path);
};

// Export a function that can act as a handler

module.exports = app;
