const { Schema, model } = require('mongoose')
require('colors')
const Joi = require('joi')

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'.bold.yellow],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true, // add two features: create, update
  }
)

const joiSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
})

// check for status favorite
const joiSchemaFavorite = Joi.object({
  favorite: Joi.boolean().required(),
})

const Contact = model('contact', contactSchema)

module.exports = { Contact, joiSchema, joiSchemaFavorite }
