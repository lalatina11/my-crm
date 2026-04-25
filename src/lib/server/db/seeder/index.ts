import { db } from '..';
import activitySeeder from './activity-seeder';
import contactSeeder from './contact-seeder';
import dealSeeder from './deal-seeder';

const main = async () => {
	console.log('🏁 [Database Seeder]: Starting overall seeding process...');
	
	await contactSeeder();
	await dealSeeder();
	await activitySeeder();
	
	console.log('✨ [Database Seeder]: All seeders completed successfully!');
};

main()
	.catch((err) => {
		console.error('💥 [Database Seeder]: Critical error during seeding:', err);
		process.exit(1);
	})
	.then(async () => {
		await db.$client.end();
		console.log('👋 [Database Seeder]: Connection closed.');
	});
