<script lang="ts">
	import * as Command from "$lib/components/ui/command";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	import {
		LayoutDashboard,
		Users,
		User,
		Briefcase,
		Activity as ActivityIcon,
		Search,
		PlusCircle,
	} from "@lucide/svelte";

	let open = $state(false);

	onMount(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				open = !open;
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	});

	function runCommand(command: () => void) {
		open = false;
		command();
	}
</script>

<div class="fixed top-4 right-4 z-50">
	<button
		class="flex h-9 w-9 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground md:h-10 md:w-40 md:justify-start md:px-4 md:py-2"
		onclick={() => (open = true)}
	>
		<Search class="h-4 w-4 md:mr-2" />
		<span class="hidden text-sm font-medium md:inline-flex">Search...</span>
		<kbd
			class="pointer-events-none hidden h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 select-none md:ml-auto md:flex"
		>
			<span class="text-xs">⌘</span>K
		</kbd>
	</button>
</div>

<Command.Dialog bind:open>
	<Command.Input placeholder="Type a command or search..." />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Navigation">
			<Command.Item onSelect={() => runCommand(() => goto(resolve("/dashboard")))}>
				<LayoutDashboard class="mr-2 h-4 w-4" />
				<span>Dashboard</span>
			</Command.Item>
			<Command.Item onSelect={() => runCommand(() => goto(resolve("/dashboard/contacts")))}>
				<Users class="mr-2 h-4 w-4" />
				<span>Contacts</span>
			</Command.Item>
			<Command.Item onSelect={() => runCommand(() => goto(resolve("/dashboard/deals")))}>
				<Briefcase class="mr-2 h-4 w-4" />
				<span>Deals</span>
			</Command.Item>
			<Command.Item onSelect={() => runCommand(() => goto(resolve("/dashboard/activities")))}>
				<ActivityIcon class="mr-2 h-4 w-4" />
				<span>Activities</span>
			</Command.Item>
			<Command.Item onSelect={() => runCommand(() => goto(resolve("/dashboard/profile")))}>
				<User class="mr-2 h-4 w-4" />
				<span>Profile</span>
			</Command.Item>
		</Command.Group>
		<Command.Separator />
		<Command.Group heading="Quick Actions">
			<Command.Item onSelect={() => runCommand(() => goto(resolve("/dashboard/contacts")))}>
				<PlusCircle class="mr-2 h-4 w-4" />
				<span>New Contact</span>
			</Command.Item>
			<Command.Item onSelect={() => runCommand(() => goto(resolve("/dashboard/activities")))}>
				<PlusCircle class="mr-2 h-4 w-4" />
				<span>Log Activity</span>
			</Command.Item>
		</Command.Group>
	</Command.List>
</Command.Dialog>
