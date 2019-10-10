const {
  verify,
  generateVerifyToken,
  getTokenFromRequest,
  signPayload,
} = require('./auth');

describe('Auth.verify', () => {
  it('creates valid token based on email', () => {
    const email = 'test@test.no';
    const token = generateVerifyToken(email);
    expect(verify(token).id).toEqual(email);
  });

  it('throws TokenExpiredError if token has expired', () => {
    const token = signPayload({ payload: { id: 'some-id' }, expires: 0 });
    expect.assertions(1);
    try {
      verify(token);
    } catch (error) {
      expect(error.message).toEqual('jwt expired');
    }
  });
});

test('getTokenFromRequest: gets token from Authorization header', () => {
  const secret = 'some-secret';
  const mockRequest = {
    headers: {
      Authorization: `bearer ${secret}`,
    },
  };
  const token = getTokenFromRequest(mockRequest);
  expect(token).toEqual(secret);
});

test('getTokenFromRequest: gets token from query parameter if header is not present', () => {
  const secret = 'some-secret';
  const mockRequest = {
    headers: {},
    query: {
      token: secret,
    },
  };
  const token = getTokenFromRequest(mockRequest);
  expect(token).toEqual(secret);
});
