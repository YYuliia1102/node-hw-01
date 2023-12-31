import fs from "fs/promises";
import path from "path";

const contactsPath = path.resolve('db', 'contacts.json');

async function readContactsFile() {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function writeContactsFile(contacts) {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf-8');
}

async function listContacts() {
    const contacts = await readContactsFile();
    return contacts;
}

async function getContactById(contactId) {
    const contacts = await readContactsFile();
    return contacts.find(contact => contact.id === contactId) || null;
}

async function removeContact(contactId) {
    const contacts = await readContactsFile();
    const removedContact = contacts.find(contact => contact.id === contactId);

    if (!removedContact) {
        return null;
    }

    const updatedContacts = contacts.filter(contact => contact.id !== contactId);
    await writeContactsFile(updatedContacts);

    return removedContact;
}

async function addContact(name, email, phone) {
    const contacts = await readContactsFile();
    const newContact = { id: Date.now(), name, email, phone };
    contacts.push(newContact);
    await writeContactsFile(contacts);

    return newContact;
}

export default {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};
