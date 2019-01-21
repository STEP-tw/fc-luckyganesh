class Comments{
  constructor(){
    this.comments = [];
  }
  getComments(){
    return this.comments;
  }
  addComment(comment){
    return this.comments.push(comment);
  }
  toString(){
    return JSON.stringify(this.comments);
  }
  addMultipleComments(comments){
    this.comments = this.comments.concat(comments);
  }
}

const readCommentsJson = function (fs) {
  const commentsFile = './src/commenters_data.json';
  const exists = fs.existsSync(commentsFile);
  if (!exists) {
    fs.writeFileSync(commentsFile,'[]','utf8');
  }
  const commentsInText = fs.readFileSync(commentsFile,'utf8');
  return JSON.parse(commentsInText);
};

module.exports = {
  Comments,
  readCommentsJson
}