import { faker } from '@faker-js/faker';
import { db } from '..';
import tables from '../tables';
import { allowedActivityTypes } from '$lib/validators/activity-schema';
import wait from '$lib/wait';

type Activity = typeof tables.activities.$inferInsert;

const activitySeeder = async () => {
	console.log('🚀 [Activity Seeder]: Starting...');
	const contactIds = await db.query.contacts.findMany({
		columns: { id: true }
	});
	const dealIds = await db.query.deals.findMany({
		columns: { id: true }
	});
	const NUMBER_OF_ACTIVITIES = 50;
	console.log(`📦 [Activity Seeder]: Generating ${NUMBER_OF_ACTIVITIES} activities...`);
	const activities = Array.from({ length: NUMBER_OF_ACTIVITIES }).map(() => {
		const date = faker.date.soon().toISOString().split('T')[0];
		const contactId = faker.helpers.arrayElement(contactIds);
		const dealId = faker.helpers.arrayElement(dealIds);
		const title = faker.book.genre();
		const description = faker.book.title();
		const activityType = faker.helpers.arrayElement(allowedActivityTypes);
		return {
			contactId: contactId.id,
			dealId: dealId.id,
			date,
			title,
			description,
			type: activityType
		};
	}) satisfies Array<Activity>;

	for (const [index, activity] of activities.entries()) {
		console.log(`⏳ [Activity Seeder]: Inserting ${index + 1}/${NUMBER_OF_ACTIVITIES}...`);
		await wait(50);
		await db.insert(tables.activities).values(activity);
	}
	console.log('✅ [Activity Seeder]: Finished!');
};

export default activitySeeder;
