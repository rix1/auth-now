import {JsonWebTokenError, TokenExpiredError} from 'jsonwebtoken';
import auth from '../../../auth';

module.exports = (req, res) => {
  const { token } = req.query;

  let data;
  try {
    data = auth.verify(token);
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return res.status(401).send();
    }
    if (err instanceof JsonWebTokenError) {
      return res.status(400).send('Invalid JWT format.');
    }
    console.log(err);
    return res.status(500).send('Error');
  }
  const newToken = auth.generateDataToken(data.id);

  return res.status(200).json({ token: newToken });
};
