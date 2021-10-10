const express = require('express')

const {
  controllerWrapper,
  validation,
  favoriteValidation,
} = require('../../middlewares')
const { joiSchema, joiSchemaFavorite } = require('../../models/contactModel')
const { contacts: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.getAll))

router.get('/:contactId', controllerWrapper(ctrl.getById))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.add))

router.delete('/:contactId', controllerWrapper(ctrl.delById))

router.put(
  '/:contactId',
  validation(joiSchema),
  controllerWrapper(ctrl.updateById)
)

router.patch(
  '/:contactId/favorite',
  favoriteValidation(joiSchemaFavorite),
  controllerWrapper(ctrl.updateStatus)
)

module.exports = router
