import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ cookies, locals }) => {
	const sidebarOpenState = cookies.get("sidebar:state");
	const sidebarState = sidebarOpenState === "false" ? false : true;
	if (!locals.user) {
		return redirect(301, "/auth");
	}
	return { sidebarState };
};
