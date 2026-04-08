import { faker } from '@faker-js/faker';
import tables from '../tables';
import wait from '$lib/wait';
import { db } from '..';

type Contacts = typeof tables.contacts.$inferInsert;

const contactSeeder = async () => {
	console.log('Contact seeder started...');
	const allowedStatuses = ['CHURNED', 'CUSTOMER', 'LEAD', 'PROSPECT'] satisfies Array<
		Contacts['status']
	>;
	console.log('Allowed statuses:', allowedStatuses);

	console.log('Generating fake contacts...');
	const contacts = Array.from({ length: 50 }).map(() => {
		const name = faker.person.fullName();
		const fakerPhone = faker.phone.number();
		const phone = fakerPhone.length > 20 ? fakerPhone.slice(0, 20) : fakerPhone;
		const address = faker.location.city();
		const company = faker.company.name();
		const email = faker.internet.email().toLowerCase();
		const status = faker.helpers.arrayElement(allowedStatuses) as Contacts['status'];
		const notes = faker.lorem.sentence({ min: 5, max: 10 });
		return { name, phone, address, company, email, status, notes };
	}) satisfies Array<Contacts>;

	console.log(`Generated ${contacts.length} contacts.`);

	for (const [idx, contact] of contacts.entries()) {
		console.log(`Inserting ${idx + 1}/${contacts.length} contact into the database...`);
		await wait(100);
		try {
			await db.insert(tables.contacts).values(contact);
		} catch (err) {
			console.error(`Failed to insert contact: ${contact.name} (${contact.email}) ❌`, err);
		}
	}
	console.log('Contact seeding finished!');
};

export default contactSeeder;
