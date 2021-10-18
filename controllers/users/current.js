const { User } = require('../../models');

const current = async (req, res, next) => {
  const { _id } = req.user;
  const curUser = await User.findById({ _id });
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      email: curUser.email,
      subscription: curUser.subscription,
    },
  });
};

module.exports = current;
