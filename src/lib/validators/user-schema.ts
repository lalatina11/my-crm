import { z } from "zod";

export const profileSchema = z.object({
	name: z.string().min(3, "Name must be at least 3 characters"),
	email: z.email("Invalid email address"),
	image: z.any().nullable(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
