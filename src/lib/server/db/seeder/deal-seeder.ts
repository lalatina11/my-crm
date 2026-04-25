import { faker } from '@faker-js/faker';
import { db } from '..';
import tables from '../tables';
import { allowedDealStatus } from '$lib/validators/deal-schema';
import wait from '$lib/wait';
type Deal = typeof tables.deals.$inferInsert;

const dealSeeder = async () => {
	console.log('🚀 [Deal Seeder]: Starting...');
	const DEAL_NUMBER = 50;
	const firstContact = await db.query.contacts.findFirst({
		columns: { id: true }
	});

	if (!firstContact) {
		throw new Error('Please do contact seeder first!');
	}

	console.log(`📦 [Deal Seeder]: Generating ${DEAL_NUMBER} deals...`);
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
		console.log(`⏳ [Deal Seeder]: Inserting ${index + 1}/${DEAL_NUMBER}...`);
		await wait(50);
		await db.insert(tables.deals).values(deal);
	}
	console.log('✅ [Deal Seeder]: Finished!');
};

export default dealSeeder;
