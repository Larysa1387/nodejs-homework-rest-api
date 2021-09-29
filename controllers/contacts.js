const { NotFound, BadRequest } = require('http-errors')
const Joi = require('joi')

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactById,
} = require('../model/contacts/index')

const joiSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  phone: Joi.string().required(),
})

const getAll = async (req, res, next) => {
  const contacts = await listContacts()
  res.json(contacts)
}

const getById = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await getContactById(contactId)
  if (!contact) {
    throw new NotFound(`Contact with id-${contactId} not found`)
  }
  res.json(contact)
}
const add = async (req, res, next) => {
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
}
const delById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await removeContact(contactId)
  if (!result) {
    throw new NotFound(`Contact with id-${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Contact deleted',
  })
}

const updateById = async (req, res, next) => {
  const { error } = joiSchema.validate(req.body)
  if (error) {
    throw new BadRequest(error.message)
  }
  const { contactId } = req.params
  const result = await updateContactById(contactId, req.body)
  if (!result) {
    throw new NotFound(`Contact with id-${contactId} not found`)
  }

  res.json({
    status: 'success',
    code: 200,
    data: { result },
  })
}

module.exports = { getAll, getById, add, delById, updateById }
