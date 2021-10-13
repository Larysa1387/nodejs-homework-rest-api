const express = require('express');

const {
  controllerWrapper,
  validation,
  // favoriteValidation,
} = require('../../middlewares');

const { joiSchema } = require('../../models/userModel');

const { users: ctrl } = require('../../controllers');

const router = express.Router();

// post on /api/users/signup
router.post('/signup', validation(joiSchema), controllerWrapper(ctrl.signup));
router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login));
router.get('/logout', controllerWrapper(ctrl.logout));
// router.post('/logout', controllerWrapper(ctrl.logout))

module.exports = router;
