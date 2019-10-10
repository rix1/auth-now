process.env = Object.assign(process.env, {
  JWT_PRIVATE_KEY: 'jwt-secret',
  MAILGUN_API_KEY: 'mailgun-test-key',
  MAILGUN_DOMAIN: 'auth-now.sh',
});

module.exports = {
  roots: ['./src', './api'],
};
