<script>
	import { Button } from '$lib/components/ui/button';
	import { toast } from 'svelte-sonner';
</script>

<svelte:head>
	<title>My CRM</title>
</svelte:head>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<Button size="default" onclick={() => toast.success('Test')}>Toast</Button>
