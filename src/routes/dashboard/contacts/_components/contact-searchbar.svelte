<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import * as InputGroup from '$lib/components/ui/input-group';
	import { Cross, Search } from '@lucide/svelte';

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
