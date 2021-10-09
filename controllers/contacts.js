const { NotFound } = require('http-errors')

const { Contact } = require('../models')

const getAll = async (req, res, next) => {
  const contacts = await Contact.find({}) // can add after {}, what we want to get: {}, "_id name email phone favorite"
  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts,
    },
  })
}

const getById = async (req, res, next) => {
  const { contactId } = req.params
  const contact = await Contact.findById(contactId)
  if (!contact) {
    throw new NotFound(`Contact with id-${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      contact,
    },
  })
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
  const result = await Contact.findByIdAndDelete(contactId)
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
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  })
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
  res.json({
    status: 'success',
    code: 200,
    message: 'Status of favorite updated',
    data: { result },
  })
}

module.exports = {
  getAll,
  getById,
  add,
  delById,
  updateById,
  updateStatus,
}
