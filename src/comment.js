const { ENCODING_FORMAT } = require('./constants.js')

class Comments {
  constructor() {
    this.comments = [];
  }
  getComments() {
    return this.comments;
  }
  addComment(comment) {
    return this.comments.push(comment);
  }
  toString() {
    return JSON.stringify(this.comments);
  }
  addMultipleComments(comments) {
    this.comments = this.comments.concat(comments);
  }
}

const readCommentsJson = function (fs, commentsFile) {
  const exists = fs.existsSync(commentsFile);
  if (!exists) {
    fs.writeFileSync(commentsFile, '[]', ENCODING_FORMAT);
  }
  const commentsInText = fs.readFileSync(commentsFile,ENCODING_FORMAT);
  return JSON.parse(commentsInText);
};

module.exports = {
  Comments,
  readCommentsJson
}