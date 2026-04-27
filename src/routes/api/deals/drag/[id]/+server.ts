import { IS_PRODUCTION } from '$lib/server/constants';
import { db } from '$lib/server/db';
import tables from '$lib/server/db/tables';
import { dealSchema } from '$lib/validators/deal-schema';
import { json, type RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const PATCH: RequestHandler = async ({ request, params }) => {
	try {
		const id = params.id;

		const body = await request.json();

		const dealDragSchema = dealSchema.pick({ status: true });

		if (!id) {
			return json({ success: false, message: 'Invalid Deal ID' });
		}

		const validation = dealDragSchema.safeParse(body);

		if (!validation.success) {
			return json({ success: false, message: validation.error.message });
		}

		const existingDeal = await db.$count(tables.deals, eq(tables.deals.id, id));

		if (existingDeal < 1) {
			return json({ success: false, message: 'Invalid Deal ID' });
		}

		await db
			.update(tables.deals)
			.set({ status: validation.data.status })
			.where(eq(tables.deals.id, id));

		return json({ success: true });
	} catch (error) {
		if (!IS_PRODUCTION) {
			const { message } = error as Error;
			return json({ success: false, message });
		}
		return json({ success: false, message: 'Something went wrong' });
	}
};
