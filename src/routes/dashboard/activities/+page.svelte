<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Plus } from '@lucide/svelte';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>My CRM | Activities</title>
</svelte:head>

<main class="flex min-h-screen flex-col">
	<section class="flex flex-col gap-6">
		<div class="flex items-center justify-between">
			<h1 class="text-3xl font-semibold underline underline-offset-4">Activities</h1>
			<Button><Plus /> Activity</Button>
		</div>
		<div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
			{#each data.activities as activitiy (activitiy.id)}
				<Card.Root>
					<Card.Header>
						<Card.Title>
							{activitiy.title}
						</Card.Title>
						<Card.Description>{activitiy.description}</Card.Description>
					</Card.Header>
					<Card.Content>
						<div class="flex flex-col gap-3">
							<span>Deal: </span>
							<span>Title: {activitiy.deal.title}</span>
							<span>Date: {activitiy.deal.date}</span>
							<span>status: <Badge>{activitiy.deal.status}</Badge></span>
						</div>
					</Card.Content>
					<Card.Footer>
						<div class="flex flex-col gap-3">
							<span>Contact: </span>
							<span>Name: {activitiy.contact.name}</span>
							<span>Email: {activitiy.contact.email}</span>
							<span>Status: <Badge>{activitiy.contact.status}</Badge></span>
						</div>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	</section>
</main>
