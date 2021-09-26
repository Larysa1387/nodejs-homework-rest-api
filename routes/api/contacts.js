const express = require('express')
const { NotFound, BadRequest } = require('http-errors')
const Joi = require('joi')
const router = express.Router()
const {
  listContacts,
  getContactById,
  addContact,
  // removeContact,
} = require('../../model/contacts/index')

const joiSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  phone: Joi.number().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.json(contacts)
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await getContactById(contactId)
    if (!contact) {
      throw new NotFound(`Contact with id-${contactId} not found`)
      // next(createError(404, `Contact with id-${contactId} not found`))
      // res.status(404).json({
      //   status: 'error',
      //   code: 404,
      //   message: `Contact with id-${contactId} not found`,
      // })
      // return
    }
    res.json(contact)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const result = await addContact(req.body)
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { result },
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
