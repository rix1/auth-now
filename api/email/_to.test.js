const mailgunAPI = require('./[to]');

const TEST_DOMAIN = 'my-service.com';

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

const mockRequest = toEmail => {
  return {
    query: {
      to: toEmail,
    },
    headers: {
      host: TEST_DOMAIN,
    },
  };
};

it('returns 200 when sending email', () => {
  const email = 'mail@domain.com';
  const req = mockRequest(email);
  const res = mockResponse();

  return mailgunAPI(req, res).then(() => {
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      msg: `Authentication email sent to ${email}. Please check your email for further instructions`,
    });
  });
});
