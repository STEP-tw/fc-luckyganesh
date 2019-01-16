const fs = require('fs');

const readFiles = function(req,res,fileName){
  fs.readFile(fileName,(err,data) => {
    if(err){
      res.statusCode = 400;
      console.log(req.url);
      res.end();
      return ;
    }
    res.statusCode = 200;
    res.write(data);
    res.end();
  });
}

const app = (req, res) => {
  readFiles(req,res,req.url.slice(1) || "index.html");
};

// Export a function that can act as a handler

module.exports = app;
