import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import { verify } from '../../auth';

const secretStore = {
  'tomfa@otovo.com': { fisk: 1 },
};

const getToken = req => {
  const authHeader = req.headers.Authorization;
  if (authHeader !== undefined && authHeader.split(' ').length > 1) {
    return authHeader.split(' ')[1];
  }
  return req.query.token;
};

module.exports = (req, res) => {
  const { id } = req.query;
  const token = getToken(req);

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
