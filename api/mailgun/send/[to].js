import * as mailgun from 'mailgun.js';
import { generateVerifyEmailMessage } from "../../../email";

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
  const msg = generateVerifyEmailMessage({ email, hostDomain: req.headers.host });
  sendMail(msg)
    .then(response => {
      console.log(response);
      res.status(200).json(msg);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Error');
    });
};
