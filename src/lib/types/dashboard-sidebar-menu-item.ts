import type { ResolvedPathname } from '$app/types';
import type { LucideProps } from '@lucide/svelte';
import type { Component } from 'svelte';

export interface DashboardSidebarMenuItem {
	title: string;
	url: ResolvedPathname;
	icon: Component<LucideProps>;
}
