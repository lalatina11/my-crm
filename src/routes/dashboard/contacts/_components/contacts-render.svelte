<script lang="ts">
	import type { Contact } from '$lib/types/db-schema-type';
	import ContactCard from './contact-card.svelte';

	interface Props {
		contacts: Array<Contact>;
	}

	const { contacts }: Props = $props();
</script>

<span class="my-5 text-muted-foreground">Find {contacts.length} Contacts...</span>
{#each contacts as contact (contact.id)}
	<ContactCard {contact} />
{/each}
