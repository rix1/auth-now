import {TokenExpiredError} from "jsonwebtoken";

var jwt = require('jsonwebtoken');

var privateKey = 'SDOSAD';
var issuer = 'auth-now';

var signPayload = ({ data, expires = '1h' }= {}) => jwt.sign(payload, privateKey, { expiresIn: expires, issuer });
var verify = token => jwt.verify(token, privateKey); // can throw TokenExpiredError

const generateDataToken = id => {
  const data = {
    id,
  };
  return signPayload(data)
};

const secretStore = {
  'tomfa@otovo.com': {'fisk': 1}
};

module.exports = (req, res) => {
  const {
    query: { id }
  } = req;

  // TODO: Get auth headers from request
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRvbWZhQG90b3ZvLmNvbSIsImlhdCI6MTU2NjczNzU2NCwiZXhwIjoxNTY2NzQxMTY0fQ.1B3u1wImYXIXCVQzAH-b-ndCy6Qx6bhWHrQCzTGoQIs'

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
    console.log(err);
    return res.status(500).send('Error');
  }

  // TODO: Get data from persistant store
  const idData = secretStore[id];
  if (idData === undefined) {
    secretStore[id] = {}
  }

  return res.status(200).json(secretStore[id]);
};
