<script lang="ts">
	import DashboadSidebar from '$lib/components/dashboad-sidebar.svelte';
	import ModeToggle from '$lib/components/ModeToggle.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar';

	const { children } = $props();
</script>

<Sidebar.Provider>
	<DashboadSidebar />
	<main class="flex min-h-screen w-full flex-col">
		<header class="flex items-center justify-between bg-card p-4">
			<div class="flex items-center gap-3">
				<Sidebar.Trigger />
				<span>Dashboard</span>
			</div>
			<ModeToggle />
		</header>
		<div class="p-4">
			{@render children()}
		</div>
	</main>
</Sidebar.Provider>
