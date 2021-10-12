const { Conflict } = require('http-errors')
const bCrypt = require('bcryptjs')

const { User } = require('../../models')

const signup = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Email in use')
    // res.status(409).json({
    //   status: 'error',
    //   code: 409,
    //   message: 'Email in use',
    // })
    // // eslint-disable-next-line no-useless-return
    // return
  }

  const hashPassword = bCrypt.hashSync(password, bCrypt.genSaltSync(10))

  await User.create({ email, password: hashPassword })

  res.status(201).json({
    status: 'success',
    code: 201,
    message: 'Registed successful',
  })
}

module.exports = signup
