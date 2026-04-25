import z from 'zod';

export const allowedDealStatus = [
	'QUALIFICATION',
	'PROPOSAL',
	'NEGOTIATION',
	'CLOSED_WON',
	'CLOSED_LOST'
] as const;

export const dealSchema = z.object({
	title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
	value: z.number().min(10),
	status: z.enum(allowedDealStatus, {
		message: 'Status must be one of: ' + allowedDealStatus.join(', ')
	}),
	contactId: z.string().min(1, { message: 'Invalid Contact' }).optional()
});

export type DealSchemaType = z.infer<typeof dealSchema>;
