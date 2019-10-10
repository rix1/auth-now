const auth = require('../../auth');

const generateVerifyEmail = ({ email, hostDomain }) => {
  const subject = 'Welcome to AuthNow';
  const token = auth.generateVerifyToken(email);
  const url = `http://${hostDomain}/api/verify/${token}`;
  const text =
    'Welcome to AuthNow! \n\n' +
    'To verify this email, please click the link below:\n' +
    '\n' +
    `${url}\n` +
    '\n' +
    '\n' +
    '-- \n' +
    'Best regards from AuthNow';
  return {
    to: email,
    from: `no-reply@${process.env.MAILGUN_DOMAIN}`,
    subject,
    text,
    url,
  };
};

module.exports = generateVerifyEmail;
