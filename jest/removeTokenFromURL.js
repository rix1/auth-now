const url = require('url');

module.exports = urlPath =>
  url
    .parse(urlPath)
    .path.split('/')
    .slice(0, -1) // remove last element
    .join('/');
