const client = require('../_mailgunClient.js');
const { generateVerifyEmailMessage } = require('../../../src/email/email');

const log = console;

module.exports = (req, res) => {
  const { to: email } = req.query;
  const msg = generateVerifyEmailMessage({
    email,
    hostDomain: req.headers.host,
  });
  return client
    .messages()
    .send(msg)
    .then(response => {
      log.info(response);
      res.status(200).json({
        msg: `Authentication email sent to ${email}. Please check your email for further instructions`,
      });
    })
    .catch(err => {
      log.error(err);
      res.status(500).send('Error');
    });
};
