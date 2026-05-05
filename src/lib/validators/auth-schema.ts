import z from "zod";

export const registerSchema = z
	.object({
		name: z.string("Name is required").min(3, "Name is required min 3 character(s)"),
		email: z.email("Please insert a valid email").lowercase("Only lowercase email are accepted."),
		password: z
			.string()
			.min(8, "Password is required min 8 character(s)")
			.max(32, "Password is required max 32 character(s)"),
		confirm_password: z
			.string()
			.min(8, "Confirm Password is required min 8 character(s)")
			.max(32, "Confirm Password is required max 32 character(s)"),
	})
	.refine((data) => data.password === data.confirm_password, {
		error: "Password does not match",
		path: ["confirm_password"],
	});

export const loginSchema = z.object({
	email: z.email("Please insert a valid email").lowercase("Only lowercase email are accepted."),
	password: z
		.string()
		.min(8, "Password is required min 8 character(s)")
		.max(32, "Password is required max 32 character(s)"),
});
