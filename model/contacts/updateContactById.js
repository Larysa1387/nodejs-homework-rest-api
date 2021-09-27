const fs = require('fs/promises')
const path = require('path')
const listContacts = require('./listContacts')

const contactsPath = path.join(__dirname, '..', 'contacts.json')

const updateContactById = async (id, data) => {
  const allContacts = await listContacts()
  const contactIdx = allContacts.findIndex(contact => contact.id === Number(id))
  if (contactIdx === -1) return null
  allContacts[contactIdx] = { ...allContacts[contactIdx], ...data }
  await fs.writeFile(contactsPath, JSON.stringify(allContacts))
  return allContacts[contactIdx]
}

module.exports = updateContactById
