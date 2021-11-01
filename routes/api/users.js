const express = require('express');

const {
  controllerWrapper,
  validation,
  authenticate,
  upload,
} = require('../../middlewares');

const { joiSchema } = require('../../models/userModel');

const { users: ctrl } = require('../../controllers');

const router = express.Router();

// router on /api/users/...
// /avatars
router.post('/signup', validation(joiSchema), controllerWrapper(ctrl.signup));
// router for email verification
router.get('/verify/:verificationToken', controllerWrapper(ctrl.verify));
router.post('/verify', controllerWrapper(ctrl.reVerify));

router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login));
router.patch('/', authenticate, controllerWrapper(ctrl.subscription));
router.patch(
  '/avatars',
  authenticate,
  upload.single('avatar'),
  controllerWrapper(ctrl.updateAvatar)
);
router.get('/logout', authenticate, controllerWrapper(ctrl.logout));
// router.post('/logout', controllerWrapper(ctrl.logout))
router.get('/current', authenticate, controllerWrapper(ctrl.current));

module.exports = router;
