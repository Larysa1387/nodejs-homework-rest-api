const { Unauthorized } = require('http-errors');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const { SECRET_KEY } = process.env;

const authenticate = async (req, _, next) => {
  const { authorization } = req.headers;
  const [bearer, token] = authorization.split(' ');
  if (bearer !== 'Bearer') {
    throw new Unauthorized('Invalid token');
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    // Find user by using model
    const user = await User.findById(id);

    if (!user || !user.token) {
      throw new Unauthorized('Invalid token');
    }
    // throw user by req (obj) to the controllers
    req.user = user;
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};

module.exports = authenticate;
