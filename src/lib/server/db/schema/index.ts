import { pgTable, serial, integer, text, varchar, uuid, date } from 'drizzle-orm/pg-core';
import { id, timeStamps } from '$lib/db-schema-helper';

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
	dealValue: integer('deal_value'),
	status: text({
		enum: ['QUALIFICATION', 'PROPOSAL', 'NEGOTIATION', 'CLOSED_WON', 'CLOSED_LOST']
	}).notNull(),
	contactId: uuid('contact_id')
		.references(() => contacts.id, { onDelete: 'cascade' })
		.notNull(),
	date: date({ mode: 'string' })
});

export const activities = pgTable('activities', {
	id,
	...timeStamps,
	activity: text({
		enum: ['TASK', 'CALL', 'EMAIL', 'MEETING', 'NOTE', 'OTHER']
	}).notNull(),
	title: varchar({ length: 255 }),
	description: text(),
	contactId: uuid('contact_id')
		.references(() => contacts.id, { onDelete: 'cascade' })
		.notNull(),
	date: date({ mode: 'string' })
});
