import { getCurrentUserByHeaders } from "$lib/server/query/get-current-user";
import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies, request }) => {
	const sidebarOpenState = cookies.get("sidebar:state");
	const sidebarState = sidebarOpenState === "false" ? false : true;
	const session = await getCurrentUserByHeaders(request.headers);
	if (session === null) {
		return redirect(301, "/auth");
	}
	return { sidebarState };
};
