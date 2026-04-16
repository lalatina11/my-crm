import type tables from '$lib/server/db/tables';

export type Contact = typeof tables.contacts.$inferSelect;
export type Deal = typeof tables.deals.$inferSelect;
