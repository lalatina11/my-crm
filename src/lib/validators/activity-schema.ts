import z from 'zod';
export const allowedActivityTypes = ['TASK', 'CALL', 'EMAIL', 'MEETING', 'NOTE', 'OTHER'] as const;
export const allowedActivityStatus = ['PENDING', 'ON_PROGRESS', 'COMPLETED'] as const;

export const activitySchema = z.object({
	type: z.enum(allowedActivityTypes, {
		message: 'Activity type must be one of: ' + allowedActivityTypes.join(', ')
	}),
	title: z
		.string({ message: 'Title must be a string' })
		.min(3, { message: 'Title must be at least 3 characters long' }),
	description: z.string({ message: 'Description must be a string' }),
	contactId: z
		.string({ message: 'Contact ID must be a string' })
		.min(1, { message: 'Invalid Contact' }),
	dealId: z.string({ message: 'Deal ID must be a string' }).min(1, { message: 'Invalid Deal' }),
	date: z.string({ message: 'Date must be a string' }),
	status: z.enum(allowedActivityStatus, {
		message: 'Status must be one of: ' + allowedActivityStatus.join(', ')
	})
});

export type ActivitySchemaType = z.infer<typeof activitySchema>;
