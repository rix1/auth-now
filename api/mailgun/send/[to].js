const mailgun = require("mailgun.js");

const client = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});
const domain = process.env.MAILGUN_DOMAIN;

function sendMail(msg) { return client.messages.create(domain, msg) };

module.exports = (req, res) => {
  const { subject = "Sample subject", text = "Sample text" } = req.query;
  const {
    query: { to: mail }
  } = req;
  const msg = {
    to: mail,
    from: `no-reply@${domain}`,
    subject,
    text
  };
  sendMail(msg)
    .then(response => {
      console.log(response);
      res.status(200).json(msg);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Error");
    });
};
