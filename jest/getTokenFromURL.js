const url = require('url');

module.exports = inputURL =>
  url
    .parse(inputURL)
    .pathname.split('/')
    .reverse()[0];
