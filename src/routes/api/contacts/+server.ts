import { db } from '$lib/server/db';
import tables from '$lib/server/db/tables';
import { contactSchema } from '$lib/validators/contact-schema';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const validation = contactSchema.safeParse(body);
		if (!validation.success) {
			return json({ success: false, message: validation.error.message });
		}
		const [data] = await db.insert(tables.contacts).values(validation.data).returning();
		if (!data) {
			return json({ success: false, message: 'Failed to insert Contact!' });
		}
		return json({ success: true, data });
	} catch {
		return json({ success: false, message: 'Failed to insert Contact!' });
	}
};
