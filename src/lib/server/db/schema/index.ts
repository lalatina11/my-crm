import { pgTable, serial, integer, text, varchar, uuid, date } from 'drizzle-orm/pg-core';
import { id, timeStamps } from '$lib/db-schema-helper';
import { allowedDealStatus } from '$lib/validators/deal-schema';
import { allowedActivityStatus, allowedActivityTypes } from '$lib/validators/activity-schema';

export const task = pgTable('task', {
	id: serial('id').primaryKey(),
	title: text('title').notNull(),
	priority: integer('priority').notNull().default(1)
});

export const contacts = pgTable('contacts', {
	id,
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	phone: varchar({ length: 20 }).notNull(),
	company: varchar({ length: 100 }).notNull(),
	status: text({ enum: ['LEAD', 'PROSPECT', 'CUSTOMER', 'CHURNED'] }).notNull(),
	address: text().notNull(),
	notes: text(),
	...timeStamps
});

export const deals = pgTable('deals', {
	id,
	...timeStamps,
	title: varchar({ length: 255 }),
	value: integer('value'),
	status: text({
		enum: allowedDealStatus
	}).notNull(),
	contactId: uuid('contact_id')
		.references(() => contacts.id, { onDelete: 'cascade' })
		.notNull(),
	date: date({ mode: 'string' })
});

export const activities = pgTable('activities', {
	id,
	...timeStamps,
	type: text({
		enum: allowedActivityTypes
	}).notNull(),
	title: varchar({ length: 255 }),
	description: text(),
	contactId: uuid('contact_id')
		.references(() => contacts.id, { onDelete: 'cascade' })
		.notNull(),
	dealId: uuid('deal_id')
		.references(() => deals.id, { onDelete: 'cascade' })
		.notNull(),
	date: date({ mode: 'string' }),
	status: text({
		enum: allowedActivityStatus
	})
		.notNull()
		.default('PENDING')
});
