import { env } from '$env/dynamic/private';
import { db } from '$lib/server/db';
import tables from '$lib/server/db/tables';
import type { Deal } from '$lib/types/db-schema-type';
import { dealSchema } from '$lib/validators/deal-schema';
import { json, type RequestHandler } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';
import z from 'zod';

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
		const message = env.NODE !== 'production' ? (error as Error).message : 'Something went wrong';
		return json({ success: false, message });
	}
};
