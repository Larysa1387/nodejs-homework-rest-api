const express = require('express');

const {
  controllerWrapper,
  validation,
  favoriteValidation,
  authenticate,
} = require('../../middlewares');
const { joiSchema, joiSchemaFavorite } = require('../../models/contactModel');
const { contacts: ctrl } = require('../../controllers');

const router = express.Router();

router.get('/', authenticate, controllerWrapper(ctrl.getAll));

router.get('/:contactId', authenticate, controllerWrapper(ctrl.getById));

router.post(
  '/',
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.add)
);

router.delete('/:contactId', authenticate, controllerWrapper(ctrl.delById));

router.put(
  '/:contactId',
  authenticate,
  validation(joiSchema),
  controllerWrapper(ctrl.updateById)
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  favoriteValidation(joiSchemaFavorite),
  controllerWrapper(ctrl.updateStatus)
);

module.exports = router;
