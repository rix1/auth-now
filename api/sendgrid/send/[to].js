const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const templates = require('../../../email-templates/');

module.exports = (req, res) => {
  const { subject = 'Sample subject', text = 'Sample text' } = req.query;
  const {
    query: { to },
  } = req;
  const msg = {
    to,
    from: 'tomas.a.fagerbekk@gmail.com',
    subject,
    text,
    html: templates.standardTemplate,
  };
  sgMail
    .send(msg)
    .then(() => {
      res.status(200).send(`Email to ${to} schenduled for sending`);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Unknown error');
    });
};
