<script lang="ts">
	import type { PageProps } from './$types';
	import AddContactForm from './_components/add-contact-form.svelte';
	import ContactSearchbar from './_components/contact-searchbar.svelte';
	import ContactsRender from './_components/contacts-render.svelte';

	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>My CRM | Contacts</title>
</svelte:head>

<div class="flex flex-col gap-2">
	<div class="flex">
		<AddContactForm />
	</div>
	<ContactSearchbar />
	{#if !data.contacts}
		<span class="text-destructive">Something went wrong</span>
	{:else if data.contacts.length === 0}
		<span class="text-muted-foreground">Did'nt find any contacts</span>
	{:else}
		<ContactsRender contacts={data.contacts || []} />
	{/if}
</div>
