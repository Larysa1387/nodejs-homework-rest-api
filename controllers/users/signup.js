const { Conflict } = require('http-errors');
const bCrypt = require('bcryptjs');
const gravatar = require('gravatar');
const { v4 } = require('uuid');

const { User } = require('../../models');
const { sendEmail } = require('../../helpers');

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Email in use');
  }
  const avatarURL = gravatar.url(email);
  const hashPassword = bCrypt.hashSync(password, bCrypt.genSaltSync(10));
  const verifyToken = v4(); // create token and add it to the result

  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    verifyToken,
  });

  const mailTmpl = {
    to: email,
    subject: 'Verification email sent',
    html: `
    <a target="_blank" href="http://localhost:3000/api/users/verify/${verifyToken}">Click here to verify your email</a>
    `,
  };

  sendEmail(mailTmpl);

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Registed successful',
    user: { email: result.email, subscription: result.subscription },
  });
};

module.exports = signup;
