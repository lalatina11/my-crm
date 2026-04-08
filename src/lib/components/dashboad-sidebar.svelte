<script lang="ts">
	import { page } from '$app/state';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { DashboardSidebarMenuItem } from '$lib/types/dashboard-sidebar-menu-item';
	import { Activity, Contact, HeartHandshake, LayoutDashboard } from '@lucide/svelte/icons';
	import { buttonVariants } from './ui/button';

	const items = [
		{
			title: 'Dashboard',
			url: '/dashboard',
			icon: LayoutDashboard
		},
		{
			title: 'Contacts',
			url: '/dashboard/contacts',
			icon: Contact
		},
		{
			title: 'Deals',
			url: '/dashboard/deals',
			icon: HeartHandshake
		},
		{
			title: 'Activities',
			url: '/dashboard/activities',
			icon: Activity
		}
	] satisfies Array<DashboardSidebarMenuItem>;
</script>

<Sidebar.Root collapsible="icon">
	<Sidebar.Header>
		<!-- <Computer -->
	</Sidebar.Header>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<a href={item.url}>
							<Sidebar.MenuItem>
								<Sidebar.MenuButton
									class={buttonVariants({
										variant: item.url === page.url.pathname ? 'default' : 'ghost',
										class: 'items-center justify-start'
									})}
								>
									<item.icon />
									<span>{item.title}</span>
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						</a>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
