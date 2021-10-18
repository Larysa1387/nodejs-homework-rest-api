const { NotFound } = require('http-errors');

const { Contact } = require('../models');

const getAll = async (req, res, next) => {
  const { page = 1, limit = 10, favorite = null } = req.query;
  const skip = (page - 1) * limit;
  const { _id } = req.user;

  if (favorite) {
    const contacts = await Contact.find(
      { owner: _id, favorite },
      '_id name email phone favorite owner',
      {
        skip,
        limit: +limit,
      }
    ).populate('owner', 'email');

    res.json({
      status: 'success',
      code: 200,
      data: {
        contacts,
      },
    });
  }

  // can add after {}, what we want to get: {}, "_id name email phone favorite"
  const contacts = await Contact.find(
    { owner: _id },
    '_id name email phone favorite owner',
    {
      skip,
      limit: +limit,
    }
  ).populate('owner', 'email');

  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts,
    },
  });
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    throw new NotFound(`Contact with id-${contactId} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: {
      contact,
    },
  });
};

const add = async (req, res, next) => {
  const newContact = { ...req.body, owner: req.user._id };
  // const result = await Contact.create(req.body);
  const result = await Contact.create(newContact);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { result },
  });
};

const delById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw new NotFound(`Contact with id-${contactId} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Contact deleted',
  });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw new NotFound(`Contact with id-${contactId} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: { result },
  });
};

// Update status favorite of the contact
const updateStatus = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await Contact.findByIdAndUpdate(
    contactId,
    { favorite },
    { new: true }
  );
  if (!result) {
    throw new NotFound(`Contact with id-${contactId} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Status of favorite updated',
    result: { favorite, contactId, name: result.name },
  });
};

module.exports = {
  getAll,
  getById,
  add,
  delById,
  updateById,
  updateStatus,
};
