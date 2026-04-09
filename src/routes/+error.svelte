<script>
	import { page } from '$app/state';
	import NotFound from '$lib/components/error-page/not-found.svelte';
</script>

{#if page.status === 404}
	<NotFound />
{/if}
