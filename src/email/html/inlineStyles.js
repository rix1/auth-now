const fs = require('fs');
const juice = require('juice');
const log = require('../../log');

function inlineStyles(filePath) {
  const file = fs.readFileSync(filePath, 'utf8');
  if (!file) throw new Error('File not found!');
  log.info('File read. Inlining CSS for', filePath);
  return juice(file);
}

module.exports = inlineStyles;
