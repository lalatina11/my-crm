<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve */
	import { page } from "$app/state";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import type { DashboardSidebarMenuItem } from "$lib/types/dashboard-sidebar-menu-item";
	import { Activity, Contact, HeartHandshake, LayoutDashboard, User } from "@lucide/svelte/icons";
	import { buttonVariants } from "./ui/button";
	import { resolve } from "$app/paths";
	import UserDropdown from "./auth/user-dropdown.svelte";
	import * as Avatar from "./ui/avatar";
	import { authClient } from "$lib/hooks/auth-client";

	const items = [
		{
			title: "Dashboard",
			url: resolve("/dashboard"),
			icon: LayoutDashboard,
		},
		{
			title: "Contacts",
			url: resolve("/dashboard/contacts"),
			icon: Contact,
		},
		{
			title: "Deals",
			url: resolve("/dashboard/deals"),
			icon: HeartHandshake,
		},
		{
			title: "Activities",
			url: resolve("/dashboard/activities"),
			icon: Activity,
		},
	] satisfies Array<DashboardSidebarMenuItem>;

	const session = authClient.useSession();
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
										variant: item.url === page.url.pathname ? "default" : "ghost",
										class: "items-center justify-start",
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
	<Sidebar.Footer>
		<Sidebar.Menu>
			<UserDropdown>
				<Sidebar.MenuItem>
					<Sidebar.MenuButton>
						<Avatar.Root class="size-5">
							<Avatar.Image src={$session.data?.user.image} />
							<Avatar.Fallback>
								<User />
							</Avatar.Fallback>
						</Avatar.Root>
						<span> {$session.data?.user.name}</span>
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			</UserDropdown>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
