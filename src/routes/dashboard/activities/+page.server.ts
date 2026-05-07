import { getAllActivities } from '$lib/server/query/activity-query';
import { getContactsData } from '$lib/server/query/contacts-query';
import { getAllDeals } from '$lib/server/query/deals-query';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [activities, contacts, deals] = await Promise.all([
		getAllActivities(),
		getContactsData(''),
		getAllDeals()
	]);

	return {
		activities: activities ?? [],
		contacts: contacts ?? [],
		deals: deals ?? []
	};
};
