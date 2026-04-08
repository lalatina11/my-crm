<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as InputGroup from '$lib/components/ui/input-group';
	import { Copy, Cross, Search } from '@lucide/svelte';
	import type { PageProps } from './$types';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { Badge } from '$lib/components/ui/badge';
	import { capitalizingText, handleCopyToClipBoard } from '$lib/helpers';
	import { toast } from 'svelte-sonner';

	const { data }: PageProps = $props();

	let q = $state(page.url.searchParams.get('q') || '');
	let debounceTimer: ReturnType<typeof setTimeout>;

	const setSearchParams = async () => {
		// ✅ create new params from current URL
		const params = new URLSearchParams(page.url.searchParams);

		if (q) {
			params.set('q', q);
		} else {
			params.delete('q'); // ✅ clean up when empty
		}

		// ✅ push updated params to URL
		await goto(`/dashboard/contacts?${params.toString()}`, {
			invalidateAll: true,
			keepFocus: true // ✅ keep focus on input while typing
		});
	};

	const handleSearch = () => {
		// ✅ clear previous timer before setting new one (proper debounce)
		if (debounceTimer) {
			clearTimeout(debounceTimer);
		}
		debounceTimer = setTimeout(setSearchParams, 1000);
	};

	async function clearSearch() {
		q = '';
		// ✅ create new params from current URL
		const params = new URLSearchParams(page.url.searchParams);

		params.set('q', q);

		// ✅ push updated params to URL
		await goto(`/dashboard/contacts?${params.toString()}`, {
			invalidateAll: true,
			keepFocus: true // ✅ keep focus on input while typing
		});
		handleSearch();
	}
</script>

<svelte:head>
	<title>My CRM | Contacts</title>
</svelte:head>

<div class="flex flex-col gap-2">
	<InputGroup.Root>
		<InputGroup.Input bind:value={q} oninput={handleSearch} placeholder="Search..." />
		<InputGroup.Addon align="inline-start">
			<Search />
		</InputGroup.Addon>
		{#if q}
			<InputGroup.Addon align="inline-end">
				<InputGroup.Button variant="destructive" class="cursor-pointer" onclick={clearSearch}>
					<Cross class="rotate-45 " />
				</InputGroup.Button>
			</InputGroup.Addon>
		{/if}
	</InputGroup.Root>

	{#if !data.contacts}
		<span>Something went wrong</span>
	{:else if data.contacts.length === 0}
		<span>Contacts data is Empty. Please insert one.</span>
	{:else}
		<span class="my-5 text-muted-foreground">Find {data.contacts.length} Contacts...</span>
		{#each data.contacts as contact (contact.id)}
			<Card.Root>
				<Card.Header>
					<Card.Title>
						{contact.name}
						<Badge class="capitalize">{capitalizingText(contact.status)}</Badge>
					</Card.Title>
					<Card.Description class="flex flex-col gap-3">
						<span class="flex items-center gap-2">
							{contact.email}
							<Copy
								class="size-5 cursor-pointer"
								onclick={() => {
									handleCopyToClipBoard(contact.email);
									toast.success('Email copied to clipboard!');
								}}
							/>
						</span>
						<span class="flex items-center gap-2">
							{contact.phone}
							<Copy
								class="size-5 cursor-pointer"
								onclick={() => {
									handleCopyToClipBoard(contact.phone);
									toast.success('Phone number copied to clipboard!');
								}}
							/>
						</span>
					</Card.Description>
				</Card.Header>
				<Card.Content class="flex flex-col gap-2">
					<span>Company: {contact.company}</span>
					<span>Address: {contact.address}</span>
					{#if contact.notes}
						<span>Notes: {contact.notes}</span>
					{/if}
				</Card.Content>
			</Card.Root>
		{/each}
	{/if}
</div>
