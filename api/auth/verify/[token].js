import { TokenExpiredError } from 'jsonwebtoken';
import auth from '../../../auth';

module.exports = (req, res) => {
  const {
    query: { token },
  } = req;

  let data;
  try {
    data = auth.verify(token);
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      // TODO: Return 404 instead
      return res.status(401).send();
    }
    console.log(err);
    return res.status(500).send('Error');
  }
  console.log(data);
  const newToken = auth.generateDataToken(data.id);

  return res.status(200).json({ token: newToken });
};
