<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import * as InputGroup from '$lib/components/ui/input-group';
	import { Cross, Search } from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import { SvelteURLSearchParams } from 'svelte/reactivity';
	import wait from '$lib/wait';

	let q = $state(page.url.searchParams.get('q') || '');

	const handleSearch = async () => {
		await wait(1000);
		const params = new SvelteURLSearchParams();

		if (q !== '') {
			params.set('q', q);
		} else {
			params.delete('q'); // ✅ clean up when empty
		}

		await goto(resolve(`/dashboard/contacts?${params.toString()}`), {
			invalidateAll: true,
			keepFocus: true // ✅ keep focus on input while typing
		});
	};

	async function clearSearch() {
		q = '';
		const params = new SvelteURLSearchParams();

		params.set('q', q);

		await goto(resolve(`/dashboard/contacts?${params.toString()}`), {
			invalidateAll: true,
			keepFocus: true // ✅ keep focus on input while typing
		});
		handleSearch();
	}
</script>

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
