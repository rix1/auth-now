import {TokenExpiredError} from "jsonwebtoken";

var jwt = require('jsonwebtoken');

var privateKey = 'SDOSAD';
var issuer = 'auth-now';

var signPayload = ({ payload, expires = '1h' }= {}) => jwt.sign(payload, privateKey, { expiresIn: expires, issuer });
var verify = token => jwt.verify(token, privateKey); // can throw TokenExpiredError

const generateDataToken = id => {
  const payload = {
    id,
  };
  return signPayload({payload})
};

module.exports = (req, res) => {
  const {
    query: { token }
  } = req;

  let data;
  try {
    data = verify(token);
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      // TODO: Return 404 instead
      return res.status(401).send();
    }
    console.log(err);
    return res.status(500).send('Error');
  }
  console.log(data);
  const newToken = generateDataToken(data.id)

  return res.status(200).json({token: newToken });
};
