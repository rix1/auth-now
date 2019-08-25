import * as auth from './auth';

const EMAIL_DOMAIN = process.env.MAILGUN_DOMAIN;
const generateVerifyEmailMessage = ({ email, hostDomain }) => {
  const subject = 'Welcome to AuthNow';
  const token = auth.generateVerifyToken(email);
  const url = `http://${hostDomain}/auth/verify/${token}`;
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
    from: `no-reply@${EMAIL_DOMAIN}`,
    subject,
    text,
  };
};

module.exports = {
  EMAIL_DOMAIN,
  generateVerifyEmailMessage,
};
