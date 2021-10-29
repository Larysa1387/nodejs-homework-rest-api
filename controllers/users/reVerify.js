const { BadRequest } = require('http-errors');

const { User } = require('../../models');
const { sendEmail } = require('../../helpers');

const reVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequest('missing required field email');
  }
  if (user.verify) {
    throw new BadRequest('Verification has already been passed');
  }
  const mailTmpl = {
    to: user.email,
    subject: 'Verification email sent',
    html: `
    <a target="_blank" href="http://localhost:3000/api/users/verify/${user.verifyToken}">Click here to verify your email</a>
    `,
  };

  sendEmail(mailTmpl);

  res.json({
    status: 'success',
    code: 200,
    message: 'Verification email sent',
  });
};

module.exports = reVerify;
