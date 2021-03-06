const auth = require('../../auth');
const isValidAPI = require('../../../jest/isValidAPI');
const removeTokenFromURL = require('../../../jest/removeTokenFromURL');
const getTokenFromURL = require('../../../jest/getTokenFromURL');

const generateVerifyEmail = require('./generateVerifyEmail');

describe('Plaintext email template', () => {
  it('Links to a valid API endpoint', () => {
    const email = 'test@domain.com';
    const hostDomain = 'auth-now.sh';
    const { url } = generateVerifyEmail({ email, hostDomain });
    const apiPath = removeTokenFromURL(url);
    expect(isValidAPI(apiPath)).toBeTruthy();
  });

  it('Creates a email with a token that is verifiable', () => {
    const email = 'test@domain.com';
    const hostDomain = 'auth-now.sh';
    const { url } = generateVerifyEmail({ email, hostDomain });

    const payload = auth.verify(getTokenFromURL(url));
    expect(payload.id).toEqual(email);
  });
});
