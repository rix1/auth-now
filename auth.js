import * as permissions from './permissions';

const jwt = require('jsonwebtoken');

const privateKey = process.env.JWT_PRIVATE_KEY;
const issuer = process.env.JWT_ISSUER || 'auth-now';

const verify = token => jwt.verify(token, privateKey);

const signPayload = ({ payload, expires = '1h' } = {}) =>
  jwt.sign(payload, privateKey, { expiresIn: expires, issuer });

const generateDataToken = id => {
  const payload = {
    id,
    permissions: [permissions.RETRIEVE_DATA, permissions.REFRESH_AUTH_TOKEN],
  };
  return signPayload({ payload, expires: '8760h' });
};

const generateVerifyToken = id => {
  const payload = {
    id,
    permissions: [permissions.GENERATE_AUTH_TOKEN],
  };
  return signPayload({ payload, expires: '1h' });
};

const getTokenFromRequest = req => {
  const authHeader = req.headers.Authorization;
  if (authHeader !== undefined && authHeader.split(' ').length > 1) {
    return authHeader.split(' ')[1];
  }
  return req.query.token;
};

module.exports = {
  generateDataToken,
  generateVerifyToken,
  getTokenFromRequest,
  signPayload,
  verify,
};
