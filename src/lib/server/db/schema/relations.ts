import { relations } from 'drizzle-orm';
import { activities, contacts, deals } from '.';

export const contactRelations = relations(contacts, ({ many }) => ({
	activities: many(activities),
	deals: many(deals)
}));

export const dealRelations = relations(deals, ({ one, many }) => ({
	contact: one(contacts, {
		fields: [deals.contactId],
		references: [contacts.id]
	}),
	activities: many(activities)
}));
export const activitiesRelations = relations(activities, ({ one }) => ({
	contact: one(contacts, {
		fields: [activities.contactId],
		references: [contacts.id]
	}),
	deal: one(deals, {
		fields: [activities.dealId],
		references: [deals.id]
	})
}));
