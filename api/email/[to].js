const generateVerifyEmail = require('../../src/email/plaintext/generateVerifyEmail');

const client = require('./_mailgunClient');

const log = console;

module.exports = (req, res) => {
  const { to: email } = req.query;
  const msg = generateVerifyEmail({
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
