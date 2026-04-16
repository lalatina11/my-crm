import { faker } from '@faker-js/faker';
import { db } from '..';
import tables from '../tables';
import { allowedDealStatus } from '$lib/validators/deal-schema';
import wait from '$lib/wait';
type Deal = typeof tables.deals.$inferInsert;

const dealSeeder = async () => {
	const DEAL_NUMBER = 50;
	const firstContact = await db.query.contacts.findFirst({
		columns: { id: true }
	});

	if (!firstContact) {
		throw new Error('Please do contact seeder first!');
	}

	const deals = Array.from({ length: DEAL_NUMBER }).map(() => {
		const contactId = firstContact.id;
		const date = faker.date.soon().toISOString().split('T')[0];
		const title = faker.book.title();
		const status = faker.helpers.arrayElement(allowedDealStatus);
		const value = faker.number.int({ min: 100, max: 1000000 });
		return {
			title,
			date,
			status,
			value,
			contactId
		} satisfies Deal;
	}) satisfies Array<Deal>;

	for (const [index, deal] of deals.entries()) {
		await wait(50);
		console.log(`Insert ${index + 1} of ${DEAL_NUMBER}`);
		await db.insert(tables.deals).values(deal);
	}
};

export default dealSeeder;
