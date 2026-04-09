import type { Contact } from '$lib/types/db-schema-type';
import z from 'zod';
export const allowedStatus = ['CHURNED', 'CUSTOMER', 'LEAD', 'PROSPECT'] as Array<
	Contact['status']
>;

export const contactSchema = z.object({
	name: z
		.string({ message: 'Name must be a string' })
		.min(3, { message: 'Name must be at least 3 characters long' })
		.max(128, { message: 'Name must be at most 128 characters long' }),
	email: z.email({ message: 'Please enter a valid email address' }).trim().toLowerCase(),
	phone: z
		.string({ message: 'Phone must be a string' })
		.min(8, { message: 'Phone number must be at least 8 characters long' })
		.max(20, { message: 'Phone number must be at most 20 characters long' }),
	company: z
		.string({ message: 'Company must be a string' })
		.min(3, { message: 'Company name must be at least 3 characters long' })
		.max(128, { message: 'Company name must be at most 128 characters long' }),
	status: z.enum(allowedStatus, {
		message: 'Status must be one of: ' + allowedStatus.join(', ')
	}),
	address: z.string({ message: 'Address must be a string' }),
	notes: z.string({ message: 'Notes must be a string' })
});

export type ContactSchemaType = z.infer<typeof contactSchema>;
