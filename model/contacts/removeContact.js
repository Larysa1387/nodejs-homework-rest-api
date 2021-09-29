const fs = require('fs/promises')
const path = require('path')
const listContacts = require('./listContacts')

const contactsPath = path.join(__dirname, '..', 'contacts.json')

const removeContact = async id => {
  const allContacts = await listContacts()
  const deleteContactIdx = allContacts.findIndex(
    contact => contact.id === Number(id)
  )
  if (deleteContactIdx === -1) return null
  allContacts.splice(deleteContactIdx, 1)

  await fs.writeFile(contactsPath, JSON.stringify(allContacts))
  return true
}

module.exports = removeContact
