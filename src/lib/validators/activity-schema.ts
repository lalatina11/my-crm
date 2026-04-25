import z from 'zod';
export const allowedActivityTypes = ['TASK', 'CALL', 'EMAIL', 'MEETING', 'NOTE', 'OTHER'] as const;
export const allowedActivityStatus = ['PENDING', 'ON_PROGRESS', 'COMPLETED'] as const;

export const activitySchema = z.object({
	type: z.enum(allowedActivityTypes),
	title: z.string(),
	description: z.string(),
	contactId: z.string(),
	date: z.string()
});

export type ActivitySchemaType = z.infer<typeof activitySchema>;
