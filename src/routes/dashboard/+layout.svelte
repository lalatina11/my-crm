<script lang="ts">
	import UserDropdown from "$lib/components/auth/user-dropdown.svelte";
	import DashboadSidebar from "$lib/components/dashboad-sidebar.svelte";
	import ModeToggle from "$lib/components/ModeToggle.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar";
	import type { Snippet } from "svelte";
	import type { LayoutProps } from "./$types";

	interface Props extends LayoutProps {
		children: Snippet<[]>;
	}

	const { children, data }: Props = $props();
</script>

<Sidebar.Provider open={data.sidebarState}>
	<DashboadSidebar />
	<main class="flex min-h-screen w-full flex-col">
		<header class="flex items-center justify-between bg-card p-4">
			<div class="flex items-center gap-3">
				<Sidebar.Trigger />
				<span>Dashboard</span>
			</div>
			<div class="flex items-center gap-2">
				<ModeToggle />
				<UserDropdown />
			</div>
		</header>
		<!-- <CommandMenu /> -->
		<div class="p-4">
			{@render children()}
		</div>
	</main>
</Sidebar.Provider>
