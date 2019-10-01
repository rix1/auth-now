const fs = require('fs');
const juice = require('juice');

function inlineStyles(filePath) {
  const file = fs.readFileSync(filePath, 'utf8');
  if (!file) throw new Error('File not found!');
  console.info('File read. Inlining CSS for', filePath);
  return juice(file);
}

module.exports = inlineStyles;
