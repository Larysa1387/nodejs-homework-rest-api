const controllerWrapper = require('./controllerWrapper');
const { validation, favoriteValidation } = require('./validation');
const authenticate = require('./authenticate');
const upload = require('./upload');

module.exports = {
  controllerWrapper,
  validation,
  favoriteValidation,
  authenticate,
  upload,
};
