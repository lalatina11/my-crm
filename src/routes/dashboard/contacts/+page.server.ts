import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

function getContactsData(q: string) {
	try {
		return db.query.contacts.findMany({
			where: ({ name, email, company, phone, status, address }, { or, ilike }) => {
				return q
					? or(
							ilike(name, `%${q}%`),
							ilike(email, `%${q}%`),
							ilike(company, `%${q}%`),
							ilike(phone, `%${q}%`),
							ilike(status, `%${q}%`),
							ilike(address, `%${q}%`)
						)
					: undefined;
			}
		});
	} catch (error) {
		return null;
	}
}

export const load: PageServerLoad = async ({ request }) => {
	const { searchParams } = new URL(request.url);
	const q = searchParams.get('q') || '';
	const contacts = await getContactsData(q);
	return { contacts };
};
