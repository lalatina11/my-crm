<script lang="ts">
	import { LogOut, User } from "@lucide/svelte";
	import * as DropdownMenu from "../ui/dropdown-menu";
	import { authClient } from "$lib/hooks/auth-client";
	import * as Avatar from "../ui/avatar";
	import { toast } from "svelte-sonner";
	import { Spinner } from "../ui/spinner";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	import type { Snippet } from "svelte";

	interface Props {
		children?: Snippet<[]>;
	}

	let props: Props = $props();

	const session = authClient.useSession();

	let isLoading = $state(false);

	async function handleLogOut() {
		isLoading = true;
		try {
			await authClient.signOut({
				fetchOptions: {
					onError: ({ error }) => {
						toast.error("Failed", { description: error.message });
					},
					onSuccess: async () => {
						toast.success("Success", { description: "You will redirected to login page" });
						await goto(resolve("/auth"));
					},
				},
			});
		} catch {
			toast.error("Failed", { description: "Something went wrong!" });
		} finally {
			isLoading = false;
		}
	}
</script>

{#if session.value !== null}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#if props.children}
				{@render props.children()}
			{:else}
				<Avatar.Root>
					<Avatar.Image src={$session.data?.user.image} />
					<Avatar.Fallback>
						<User />
					</Avatar.Fallback>
				</Avatar.Root>
			{/if}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content class="w-xs">
			<div class="flex w-full gap-2 p-3">
				<Avatar.Root>
					<Avatar.Image src={$session.data?.user.image} />
					<Avatar.Fallback>
						<User />
					</Avatar.Fallback>
				</Avatar.Root>
				<div class="flex flex-col">
					<span class="text-xs">Name: {$session.data?.user.name}</span>
					<span class="text-xs text-muted-foreground">Email: {$session.data?.user.email}</span>
				</div>
			</div>
			<DropdownMenu.Separator />
			<DropdownMenu.Label>User Menu</DropdownMenu.Label>
			<DropdownMenu.Item onclick={() => goto(resolve("/dashboard/profile"))}>
				<div class="flex items-center gap-2">
					<User class="h-4 w-4" /> Profile
				</div>
			</DropdownMenu.Item>
			<DropdownMenu.Item disabled={isLoading} onclick={handleLogOut} variant="destructive">
				{#if isLoading}
					<Spinner />
				{:else}
					<div class="flex items-center gap-2">
						<LogOut /> Log Out
					</div>
				{/if}
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
{/if}
