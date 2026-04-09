import type tables from '$lib/server/db/tables';

export type Contact = typeof tables.contacts.$inferSelect;
