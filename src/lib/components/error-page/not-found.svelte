<script>
	import { buttonVariants } from '../ui/button';
	const isLoggedIn = false;
</script>

<svelte:head>
	<title>Not Found</title>
</svelte:head>
<main class="flex min-h-screen flex-col items-center justify-center p-4">
	<div class="relative flex flex-col items-center gap-5">
		<div class="text-3xl font-extrabold">404</div>
		<div class="mt-2 flex items-center gap-2 text-2xl font-semibold tracking-tight">
			Page Not Found
		</div>
		<p class="mt-4 max-w-md text-center">
			Oops! The page you are looking for doesn't exist or has been moved.<br />
			We couldn't find any CRM contacts at this address.
		</p>
		{#if isLoggedIn}
			<a href="/dashboard" class={buttonVariants({ variant: 'outline' })}> ← Back to Dashboard </a>
		{:else}
			<a href="/" class={buttonVariants({ variant: 'outline' })}> ← Back to Home </a>
		{/if}
	</div>
</main>
