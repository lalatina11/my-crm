import { env } from 'process';
import { db } from '../db';

export function getContactsData(q: string) {
	try {
		return db.query.contacts.findMany({
			where: ({ name, email, company, phone, status, address }, { or, ilike }) => {
				return q
					? or(
							ilike(name, `%${q}%`),
							ilike(email, `%${q}%`),
							ilike(company, `%${q}%`),
							ilike(phone, `%${q}%`),
							ilike(status, `%${q}%`),
							ilike(address, `%${q}%`)
						)
					: undefined;
			}
		});
	} catch (error) {
		if (env.NODE_ENV !== 'production') {
			console.log(error);
		}
		return null;
	}
}
