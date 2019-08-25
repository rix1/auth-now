const { JsonWebTokenError, TokenExpiredError } = require('jsonwebtoken');

const auth = require('../../auth');
const permissions = require('../../permissions');

const secretStore = {
  'tomfa@otovo.com': { fisk: 1 },
};

module.exports = (req, res) => {
  const { id } = req.query;
  const token = auth.getTokenFromRequest(req);

  try {
    const data = auth.verify(token);
    if (data.permissions.indexOf(permissions.RETRIEVE_DATA) === -1) {
      return res.status(403).json({
        status: 403,
        message: `This token is not authorized for ${permissions.RETRIEVE_DATA}`,
      });
    }
    if (data.id !== id) {
      // TODO: Return 404 instead
      return res.status(403).send();
    }
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      // TODO: Return 404 instead
      return res.status(401).send();
    }
    if (err instanceof JsonWebTokenError) {
      return res.status(400).send('Invalid JWT format.');
    }
    console.log(err);
    return res.status(500).send('Error');
  }

  // TODO: Get data from persistant store
  const idData = secretStore[id];
  if (idData === undefined) {
    secretStore[id] = {};
  }

  return res.status(200).json(secretStore[id]);
};
