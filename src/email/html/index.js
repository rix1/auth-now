const path = require('path');
const inlineStyles = require('./inlineStyles');

module.exports = {
  standardTemplate: inlineStyles(path.join(__dirname, 'base-template.html')),
};
