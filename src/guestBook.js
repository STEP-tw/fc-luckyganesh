class GuestBook {
    constructor(book){
        this.book = book;
    }
    replaceForm(form){
        this.book = this.book.replace('-_-_form_-_-',form);
    }
    getBook(){
        return this.book;
    }
}

module.exports = GuestBook;