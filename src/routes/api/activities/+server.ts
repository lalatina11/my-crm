import { IS_PRODUCTION } from '$lib/server/constants';
import { db } from '$lib/server/db';
import tables from '$lib/server/db/tables';
import { activitySchema } from '$lib/validators/activity-schema';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const validation = activitySchema.safeParse(body);

		if (!validation.success) {
			return json({ success: false, message: validation.error.issues[0].message });
		}

		await db.insert(tables.activities).values({ ...validation.data });

		return json({ success: true, msg: 'activity added' });
	} catch (error) {
		if (!IS_PRODUCTION) {
			const { message } = error as Error;
			return json({ success: false, message });
		}
		return json({ success: false, message: 'Something went wrong' });
	}
};
