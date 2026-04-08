import { db } from '..';
import contactDestroyer from './contact-destroyer';

const main = async () => {
	await contactDestroyer();
};

main()
	.catch((err) => {
		console.log(err);
	})
	.then(async () => {
		await db.$client.end();
	});
