import z from 'zod';

export const allowedDealStatus = [
	'QUALIFICATION',
	'PROPOSAL',
	'NEGOTIATION',
	'CLOSED_WON',
	'CLOSED_LOST'
] as const;

// export const deals = pgTable('deals', {
//     id,
//     ...timeStamps,
//     title: varchar({ length: 255 }),
//     value: integer('deal_value'),
//     status: text({
//         enum: ['QUALIFICATION', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST']
//     }).notNull(),
//     contactId: uuid('contact_id')
//         .references(() => contacts.id, { onDelete: 'cascade' })
//         .notNull(),
//     date: date({ mode: 'string' })
// });

export const dealSchema = z.object({
	title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
	value: z.number().min(10),
	status: z.enum(allowedDealStatus, {
		message: 'Status must be one of: ' + allowedDealStatus.join(', ')
	}),
	contactId: z.string().min(1, { message: 'Invalid Contact' }).optional()
});

export type DealSchemaType = z.infer<typeof dealSchema>;
