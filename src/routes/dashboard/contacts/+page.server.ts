import { getContactsData } from '$lib/server/query/contacts-query';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ request }) => {
	const { searchParams } = new URL(request.url);
	const q = searchParams.get('q') || '';
	const contacts = await getContactsData(q);
	return { contacts };
};
