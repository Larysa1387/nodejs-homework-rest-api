const { Unauthorized } = require('http-errors');
const bCrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../../models/userModel');
const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // if (!user) {
  //   throw new Unauthorized(`Email ${email} not found`);
  // }
  const isCorrectPassword = bCrypt.compareSync(password, user.password);
  // if (!isCorrectPassword) {
  //   throw new Unauthorized('Password incorrect');
  // }

  // Add opportunity to login only for verified email
  if (!user || !user.verify || !isCorrectPassword) {
    throw new Unauthorized(
      'Email or password is incorrect, or email is not verified'
    );
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY);

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    status: 'success',
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = login;
