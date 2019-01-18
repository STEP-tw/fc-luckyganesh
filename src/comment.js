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
}

module.exports = {
  Comments
}