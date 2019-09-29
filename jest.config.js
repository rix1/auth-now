process.env = Object.assign(process.env, { JWT_PRIVATE_KEY: 'jwt-secret' });

module.exports = {
  roots: ['./src'],
};
