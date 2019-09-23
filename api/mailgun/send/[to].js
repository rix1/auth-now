const mailgun = require('mailgun.js');

const { generateVerifyEmailMessage } = require('../../../email');

const client = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});
const emailDomain = process.env.MAILGUN_DOMAIN;

function sendMail(msg) {
  return client.messages.create(emailDomain, msg);
}

module.exports = (req, res) => {
  const { to: email } = req.query;
  const msg = generateVerifyEmailMessage({
    email,
    hostDomain: req.headers.host,
  });
  sendMail(msg)
    .then(response => {
      console.log(response);
      res.status(200).json({
        msg: `Authentication email sent to ${email}. Please check your email for further instructions`,
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error');
    });
};
