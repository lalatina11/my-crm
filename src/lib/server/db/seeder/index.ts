import { db } from '..';
import contactSeeder from './contact-seeder';
import dealSeeder from './deal-seeder';

const main = async () => {
	await contactSeeder();
	await dealSeeder();
};

main()
	.catch((err) => {
		console.log(err);
	})
	.then(async () => {
		await db.$client.end();
	});
