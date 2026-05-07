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

	const safeActivities = activities ?? [];
	const safeContacts = contacts ?? [];
	const safeDeals = deals ?? [];

	// Metrics
	const totalDealValue = safeDeals.reduce((acc, deal) => acc + (deal.value ?? 0), 0);
	const activeDeals = safeDeals.filter((d) => d.status !== 'CLOSED_WON' && d.status !== 'CLOSED_LOST').length;
	const wonDeals = safeDeals.filter((d) => d.status === 'CLOSED_WON').length;
	const pendingActivities = safeActivities.filter((a) => a.status === 'PENDING').length;

	return {
		metrics: {
			totalDealValue,
			totalDeals: safeDeals.length,
			totalContacts: safeContacts.length,
			pendingActivities,
			activeDeals,
			wonDeals
		},
		recentActivities: safeActivities.slice(0, 5),
		recentDeals: safeDeals.slice(0, 5)
	};
};
