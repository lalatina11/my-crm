import type { RequestEvent } from '@sveltejs/kit';
import { auth } from '../auth';

export const getCurrentUserByEvent = (ev: RequestEvent) => {
	try {
		return auth.api.getSession({ headers: ev.request.headers });
	} catch {
		return null;
	}
};

export const getCurrentUserByHeaders = (headers: Headers) => {
	try {
		return auth.api.getSession({ headers });
	} catch {
		return null;
	}
};
