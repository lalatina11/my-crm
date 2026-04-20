import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies }) => {
	const sidebarOpenState = cookies.get('sidebar:state');
	const sidebarState = sidebarOpenState === 'false' ? false : true;
	return { sidebarState };
};
