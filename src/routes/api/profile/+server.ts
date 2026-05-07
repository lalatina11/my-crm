import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getCurrentUserByEvent } from "$lib/server/query/get-current-user";
import { profileSchema } from "$lib/validators/user-schema";
import { db } from "$lib/server/db";
import { user as userTable } from "$lib/server/db/schema/auth-schema";
import { eq } from "drizzle-orm";
import { IS_PRODUCTION } from "$lib/server/constants";
import { writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

export const PATCH: RequestHandler = async (event) => {
	try {
		const session = await getCurrentUserByEvent(event);
		if (!session) {
			return json({ success: false, message: "Unauthorized" });
		}

		const formData = await event.request.formData();
		const name = formData.get("name") as string;
		const email = formData.get("email") as string;
		const imageFile = formData.get("image") as File | null;

		const validation = profileSchema.safeParse({ name, email, image: imageFile });

		if (!validation.success) {
			return json({ success: false, message: validation.error.issues[0].message });
		}

		// Check if email is already taken by another user
		if (email !== session.user.email) {
			const existingUser = await db.query.user.findFirst({
				where: (u, { eq, and, ne }) => and(eq(u.email, email), ne(u.id, session.user.id)),
			});

			if (existingUser) {
				return json({ success: false, message: "Email already taken" });
			}
		}

		let imageUrl = session.user.image;

		if (imageFile && imageFile.size > 0 && imageFile instanceof File) {
			const uploadDir = join(process.cwd(), "static", "uploads", "user-images");
			await mkdir(uploadDir, { recursive: true });

			const fileName = `${session.user.id}-${Date.now()}-${imageFile.name}`;
			const filePath = join(uploadDir, fileName);

			const buffer = Buffer.from(await imageFile.arrayBuffer());
			await writeFile(filePath, buffer);

			imageUrl = `/uploads/user-images/${fileName}`;
		}

		await db
			.update(userTable)
			.set({
				name,
				email,
				image: imageUrl,
			})
			.where(eq(userTable.id, session.user.id));

		return json({ success: true, message: "Profile updated successfully" });
	} catch (error) {
		if (!IS_PRODUCTION) {
			console.error(error);
			return json({ success: false, message: (error as Error).message });
		}
		return json({ success: false, message: "Internal Server Error" });
	}
};
