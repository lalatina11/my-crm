import { db } from "../db";

export const getAllActivities = () => {
	try {
		return db.query.activities.findMany({
			with: { contact: true, deal: true },
			orderBy: (t, { desc }) => desc(t.createdAt),
		});
	} catch {
		return null;
	}
};
