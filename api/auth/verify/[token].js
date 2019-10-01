const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken');
const auth = require('../../../src/auth');
const log = require('../../../src/log');
const permissions = require('../../../src/permissions');

module.exports = (req, res) => {
  const token = auth.getTokenFromRequest(req);

  let data;
  try {
    data = auth.verify(token);
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res
        .status(401)
        .json({ status: 401, message: 'Token has expired.' });
    }
    if (err instanceof JsonWebTokenError) {
      return res
        .status(400)
        .json({ status: 400, message: 'Invalid JWT format.' });
    }
    log.error(err);
    return res
      .status(500)
      .json({ status: 500, message: 'Internal server error' });
  }

  if (data.permissions.indexOf(permissions.GENERATE_AUTH_TOKEN) === -1) {
    return res.status(403).json({
      status: 403,
      message: `This token is not authorized for ${permissions.GENERATE_AUTH_TOKEN}`,
    });
  }

  const newToken = auth.generateDataToken(data.id);
  return res.status(200).json({ token: newToken });
};
