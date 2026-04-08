import { relations } from 'drizzle-orm';
import { activities, contacts, deals } from '.';

export const contactRelations = relations(contacts, ({ many }) => ({
	activities: many(activities),
	deals: many(deals)
}));

export const dealRelations = relations(deals, ({ one }) => ({
	contact: one(contacts, {
		fields: [deals.contactId],
		references: [contacts.id]
	})
}));
export const activitiesRelations = relations(activities, ({ one }) => ({
	contact: one(contacts, {
		fields: [activities.contactId],
		references: [contacts.id]
	})
}));
