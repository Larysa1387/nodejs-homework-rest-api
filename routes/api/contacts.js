const express = require('express')

const router = express.Router()
const { controllerWrapper } = require('../../middlewares')
const { products: ctrl } = require('../../controllers')

router.get('/', controllerWrapper(ctrl.getAll))

router.get('/:contactId', controllerWrapper(ctrl.getById))

router.post('/', controllerWrapper(ctrl.add))

router.delete('/:contactId', controllerWrapper(ctrl.delById))

router.put('/:contactId', controllerWrapper(ctrl.updateById))

module.exports = router
