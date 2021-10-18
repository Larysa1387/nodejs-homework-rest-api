const controllerWrapper = require('./controllerWrapper');
const { validation, favoriteValidation } = require('./validation');
const authenticate = require('./authenticate');

module.exports = {
  controllerWrapper,
  validation,
  favoriteValidation,
  authenticate,
};
