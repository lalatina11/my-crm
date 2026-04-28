import { getCurrentUserByHeaders } from "$lib/server/query/get-current-user";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ request }) => {
	const session = await getCurrentUserByHeaders(request.headers);
	if (session !== null && session.user) {
		return redirect(301, "/dashboard");
	}
	return {};
};
