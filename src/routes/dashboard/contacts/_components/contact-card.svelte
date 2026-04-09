<script lang="ts">
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import * as Card from '$lib/components/ui/card';
	import { capitalizingText, handleCopyToClipBoard } from '$lib/helpers';
	import type { Contact } from '$lib/types/db-schema-type';
	import { Copy } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	interface Props {
		contact: Contact;
	}

	const { contact }: Props = $props();
</script>

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
