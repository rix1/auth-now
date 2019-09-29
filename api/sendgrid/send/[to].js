const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const templates = require('../../../src/email/');

module.exports = (req, res) => {
  const { subject = 'Sample subject', text = 'Sample text' } = req.query;
  const {
    query: { to },
  } = req;
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject,
    text,
    html: templates.standardTemplate,
  };
  sgMail
    .send(msg)
    .then(() => {
      res.status(200).json({
        msg: `Authentication email sent to ${to}. Please check your email for further instructions`,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Unknown error');
    });
};
