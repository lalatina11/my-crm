import { z } from "zod";

export const profileSchema = z.object({
	name: z.string().min(2, "Name must be at least 2 characters"),
	email: z.email("Invalid email address"),
	image: z.any().nullable(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
