const { NotFound } = require('http-errors')

const { Contact } = require('../models')

const getAll = async (req, res, next) => {
  const contacts = await Contact.find({})
  res.json(contacts)
}

const getById = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await Contact.findById(contactId)
  if (!contact) {
    throw new NotFound(`Contact with id-${contactId} not found`)
  }
  res.json(contact)
}

const add = async (req, res, next) => {
  const result = await Contact.create(req.body)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { result },
  })
}

const delById = async (req, res, next) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId)
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
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body)
  if (!result) {
    throw new NotFound(`Contact with id-${contactId} not found`)
  }

  res.json({
    status: 'success',
    code: 200,
    data: { result },
  })
}

// Update status favorite in the contact
const updateStatus = async (req, res, next) => {
  const { contactId } = req.params
  const { favorite } = req.body
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  )
  if (!result) {
    throw new NotFound(`Contact with id-${contactId} not found`)
  }
  res.json({ message: 'Contact updated', result })
}

module.exports = {
  getAll,
  getById,
  add,
  delById,
  updateById,
  updateStatus,
}
