const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (req, res) => {
  const { subject = 'Sample subject', text = 'Sample text' } = req.query;
  const {
    query: { to },
  } = req;
  const msg = {
    to: to,
    from: 'tomas.a.fagerbekk@gmail.com',
    subject,
    text,
  };
  console.log('sending msg', msg);
  sgMail
    .send(msg)
    .then(response => {
      res.status(200).json(msg);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send('Unknown error');
    });
};
