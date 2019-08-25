const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (req, res) => {
  const { subject = "Sample subject", text = "Sample text" } = req.query;
  const {
    query: { mail }
  } = req;
  const msg = {
    to: mail,
    from: "tomas.a.fagerbekk@gmail.com",
    subject,
    text
  };
  sgMail
    .send(msg)
    .then(response => {
      res.status(200).json(msg);
    })
    .catch(err => {
      res.status(500).send("Error");
    });
};
