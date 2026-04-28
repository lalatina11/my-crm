<script lang="ts">
	import { LogOut, User } from "@lucide/svelte";
	import * as DropdownMenu from "../ui/dropdown-menu";
	import { authClient } from "$lib/hooks/auth-client";
	import * as Avatar from "../ui/avatar";
	import { toast } from "svelte-sonner";
	import { Spinner } from "../ui/spinner";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	const session = authClient.useSession();
	let isLoading = $state(false);

	async function handleLogOut() {
		try {
			await authClient.signOut({
				fetchOptions: {
					onRequest: () => {
						isLoading = true;
					},
					onResponse: () => {
						isLoading = false;
					},
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
		}
	}
</script>

{#if session.value !== null}
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<Avatar.Root>
				<Avatar.Image src="" />
				<Avatar.Fallback>
					<User />
				</Avatar.Fallback>
			</Avatar.Root>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Label>User Menu</DropdownMenu.Label>
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
