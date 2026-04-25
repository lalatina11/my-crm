import { db } from '../db';

export const getAllActivities = () => {
	try {
		return db.query.activities.findMany({
			with: { contact: true, deal: true }
		});
	} catch {
		return null;
	}
};
