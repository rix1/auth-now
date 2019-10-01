const logger = (httpOptions, payload, form) => {
  const { method, path } = httpOptions;
  const hasPayload = !!payload;
  const hasForm = !!form;

  console.log(`%s %s payload: %s form: %s`, method, path, hasPayload, hasForm);
};

const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN,
  testMode: process.env.NODE_ENV === 'test',
  testModeLogger: logger,
});

module.exports = mailgun;
