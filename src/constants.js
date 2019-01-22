const UTILS = './utils.js';
const COMMENTS_HANDLER = './comment.js';
const COMMENTS_FILE = './comments_data/commenters_data.json';
const EXPRESS = './express.js';
const SEND_HANDLER = './send.js'
const FILE_HANDLER = './fileHandler.js';
const GUEST_BOOK_URL = '/guest_book.html';
const GUEST_BOOK = './public/guest_book.html';
const PARSER = './parse.js';
const DATA = 'data';
const END = 'end';
const EMPTY = "";
const FILE_ERROR = '400 : not found';
const ENCODING_FORMAT = 'utf8';
const EQUALS_SYMBOL = "=";
const ARGS_SEPARATOR = '&';
const MIME_TEXT_PLAIN = 'text/plain';
const MIME_TYPES = {
  css: 'text/css',
  html: 'text/html',
  js: 'text/javascript',
  csv: 'text/csv',
  gif: 'image/gif',
  htm: 'text/html',
  html: 'text/html',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  json: 'application/json',
  png: 'image/png',
  xml: 'text/xml',
  pdf: 'application/pdf'
};

module.exports = {
  UTILS,
  COMMENTS_FILE,
  COMMENTS_HANDLER,
  EXPRESS,
  FILE_HANDLER,
  GUEST_BOOK,
  GUEST_BOOK_URL,
  PARSER,
  DATA,
  END,
  EMPTY,
  FILE_ERROR,
  ENCODING_FORMAT,
  EQUALS_SYMBOL,
  ARGS_SEPARATOR,
  SEND_HANDLER,
  MIME_TEXT_PLAIN,
  MIME_TYPES
}