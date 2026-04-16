import { db } from '../db';

export const getAllDeals = () => {
	try {
		return db.query.deals.findMany({
			with: { contact: true },
			orderBy: ({ updatedAt }, { desc }) => desc(updatedAt)
		});
	} catch {
		return null;
	}
};
