const mailgun = require('mailgun-js');
const log = require('../../src/log');

function testLogger(httpOptions, payload, form) {
  const { method, path } = httpOptions;
  const hasPayload = !!payload;
  const hasForm = !!form;

  log.info(`%s %s payload: %s form: %s`, method, path, hasPayload, hasForm);
}

module.exports = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
  testMode: process.env.NODE_ENV === 'test',
  testModeLogger: testLogger,
});
