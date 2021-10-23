const { Conflict } = require('http-errors');
const bCrypt = require('bcryptjs');
const gravatar = require('gravatar');

const { User } = require('../../models');

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Email in use');
  }
  const avatarURL = gravatar.url(email);
  const hashPassword = bCrypt.hashSync(password, bCrypt.genSaltSync(10));

  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Registed successful',
    user: { email: result.email, subscription: result.subscription },
  });
};

module.exports = signup;
