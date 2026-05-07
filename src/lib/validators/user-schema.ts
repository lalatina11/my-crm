import { z } from "zod";

export const profileSchema = z.object({
	name: z.string().min(3, "Name must be at least 3 characters"),
	email: z.email("Invalid email address"),
	image: z
		.file()
		.nullable()
		.refine((input) => input instanceof File, "Only image are allowed")
		.refine((input) => {
			if (input instanceof File) {
				return input.type.startsWith("image");
			}
		}, "Only Image are allowed")
		.refine((input) => {
			if (input instanceof File) {
				return input.size < 5 * 1024 * 1024;
			}
		}, "Max image size is 5MB"),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
