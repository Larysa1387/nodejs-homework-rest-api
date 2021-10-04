const { BadRequest } = require('http-errors')

const validation = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    next()
  }
}

// Validation for status favorite
const favoriteValidation = schema => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)

    if (error) {
      throw new BadRequest('Missing field favorite')
    }
    next()
  }
}

module.exports = { validation, favoriteValidation }
