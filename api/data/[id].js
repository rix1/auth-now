import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

const jwt = require('jsonwebtoken');

const privateKey = 'SDOSAD';

const verify = token => jwt.verify(token, privateKey); // can throw TokenExpiredError

const secretStore = {
  'tomfa@otovo.com': { fisk: 1 },
};

module.exports = (req, res) => {
  const {
    // TODO: Get token from auth header instead
    query: { id, token },
  } = req;

  try {
    const data = verify(token);
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
