const express = require('express');

const {
  controllerWrapper,
  validation,
  authenticate,
  // favoriteValidation,
} = require('../../middlewares');

const { joiSchema } = require('../../models/userModel');

const { users: ctrl } = require('../../controllers');

const router = express.Router();

// router on /api/users/...
router.patch('/', authenticate, controllerWrapper(ctrl.subscription));
router.post('/signup', validation(joiSchema), controllerWrapper(ctrl.signup));
router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login));
router.get('/logout', authenticate, controllerWrapper(ctrl.logout));
// router.post('/logout', controllerWrapper(ctrl.logout))
router.get('/current', authenticate, controllerWrapper(ctrl.current));

module.exports = router;
