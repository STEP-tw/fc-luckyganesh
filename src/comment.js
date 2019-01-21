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
    return this.comments.concat(comments);
  }
}

module.exports = {
  Comments
}