import contactsService from "./contacts.js";

import { Command } from 'commander';
const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();


async function invokeAction({ action, id, name, email, phone }) {
    try {
        switch (action) {
            case 'list':
                const allContacts = await contactsService.listContacts();
                console.log('All Contacts:', allContacts);
                break;

            case 'get':
                const foundContact = await contactsService.getContactById(id);
                console.log('Found Contact:', foundContact);
                break;

            case 'add':
                const newContact = await contactsService.addContact(name, email, phone);
                console.log('New Contact:', newContact);
                break;

            case 'remove':
                const removedContact = await contactsService.removeContact(id);
                console.log('Removed Contact:', removedContact);
                break;

            default:
                console.warn('\x1B[31m Unknown action type!');
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
}

invokeAction(argv);
