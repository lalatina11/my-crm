import { getAllDeals } from '$lib/server/query/deals-query';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const deals = await getAllDeals();
	return { deals };
};
