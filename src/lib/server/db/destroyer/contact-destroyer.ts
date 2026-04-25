import { db } from '..';
import tables from '../tables';

const contactDestroyer = async () => {
	const numberOfContacts = await db.$count(tables.contacts);
	console.log(`[contact-destroyer] Found ${numberOfContacts} contact(s) in the database.`);

	if (numberOfContacts === 0) {
		console.log('[contact-destroyer] No contacts to delete.');
		return;
	}

	console.log(`[contact-destroyer] Starting deletion of all contacts...`);
	await db.delete(tables.contacts);
	console.log(`[contact-destroyer] Delete command issued.`);

	const contactsAfter = await db.$count(tables.contacts);
	console.log(`[contact-destroyer] Contacts remaining after deletion: ${contactsAfter}.`);

	console.log(`[contact-destroyer] Finished destroying contacts data.`);
};

export default contactDestroyer;
