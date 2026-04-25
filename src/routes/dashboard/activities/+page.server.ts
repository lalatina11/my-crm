import { getAllActivities } from '$lib/server/query/activity-query';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const activities = await getAllActivities();
	return {
		activities
	};
};
