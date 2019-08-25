const jwt = require('jsonwebtoken');

const privateKey = process.env.JWT_PRIVATE_KEY;
const issuer = process.env.JWT_ISSUER || 'auth-now';

const verify = token => jwt.verify(token, privateKey);

const signPayload = ({ payload, expires = '1h' } = {}) =>
  jwt.sign(payload, privateKey, { expiresIn: expires, issuer });

const generateDataToken = id => {
  const payload = {
    id,
  };
  return signPayload({ payload });
};

module.exports = {
  verify,
  signPayload,
  generateDataToken,
};
