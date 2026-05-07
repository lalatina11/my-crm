import { getCurrentUserByEvent } from '$lib/server/query/get-current-user';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const session = await getCurrentUserByEvent(event);

	if (!session) {
		throw error(401, 'Unauthorized');
	}

	return {
		user: session.user
	};
};
