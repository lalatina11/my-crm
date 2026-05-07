<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import * as Card from "$lib/components/ui/card";
	import type { PageProps } from "./$types";
	import { capitalizingText } from "$lib/helpers";
	import AddActivityForm from "./_components/add-activity-form.svelte";

	const { data }: PageProps = $props();
</script>

<svelte:head>
	<title>My CRM | Activities</title>
</svelte:head>

<main class="flex min-h-screen flex-col">
	<section class="flex flex-col gap-6">
		<div class="flex items-center justify-between">
			<h1 class="text-3xl font-semibold underline underline-offset-4">Activities</h1>
			<AddActivityForm contacts={data.contacts ?? []} deals={data.deals ?? []} />
		</div>
		<div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
			{#each data.activities as activitiy (activitiy.id)}
				{@const activityDealStatus =
					activitiy.deal.status.charAt(0) +
					activitiy.deal.status.slice(1).toLowerCase().replace("_", " ")}
				<Card.Root>
					<Card.Header>
						<Card.Title class="flex items-center justify-between">
							{activitiy.title}
							<Badge>{capitalizingText(activitiy.type)}</Badge>
						</Card.Title>
						<Card.Description class="flex items-center justify-between">
							{activitiy.description}
							{@const actStatus =
								activitiy.status === "ON_PROGRESS"
									? "On Progress"
									: capitalizingText(activitiy.status)}
							<Badge>{actStatus}</Badge>
						</Card.Description>
					</Card.Header>
					<Card.Content>
						<div class="flex flex-col gap-3">
							<span>Deal: </span>
							<span>Title: {activitiy.deal.title}</span>
							<span>Date: {activitiy.deal.date}</span>
							<span>status: <Badge>{activityDealStatus}</Badge></span>
						</div>
					</Card.Content>
					<Card.Footer>
						<div class="flex flex-col gap-3">
							<span>Contact: </span>
							<span>Name: {activitiy.contact.name}</span>
							<span>Email: {activitiy.contact.email}</span>
							<span>Status: <Badge>{capitalizingText(activitiy.contact.status)}</Badge></span>
						</div>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	</section>
</main>
