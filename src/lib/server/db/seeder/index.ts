import { db } from '..';
import contactSeeder from './contact-seeder';

const main = async () => {
	await contactSeeder();
};

main()
	.catch((err) => {
		console.log(err);
	})
	.then(async () => {
		await db.$client.end();
	});
