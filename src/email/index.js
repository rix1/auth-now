const fs = require('fs');
const path = require('path');
const juice = require('juice');

const standardTemplate = path.join(__dirname, 'standard.html');

function inlineStyles(filePath) {
  const file = fs.readFileSync(filePath, 'utf8');
  if (!file) throw new Error('File not found!');
  console.info('File read. Inlining CSS for', filePath);
  return juice(file);
}

module.exports = {
  standardTemplate: inlineStyles(standardTemplate),
};
