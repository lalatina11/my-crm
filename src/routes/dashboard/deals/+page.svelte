<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import apiRequest from '$lib/api-request';
	import * as Card from '$lib/components/ui/card';
	import { capitalizingText } from '$lib/helpers';
	import { type ApiResponse } from '$lib/types/api-response';
	import { type Deal } from '$lib/types/db-schema-type';
	import { cn } from '$lib/utils';
	import { allowedDealStatus } from '$lib/validators/deal-schema';
	import { draggable, droppable, type DragDropState } from '@thisux/sveltednd';
	import { toast } from 'svelte-sonner';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	let deals = $derived(data.deals);
	let isDragging = $state(false);

	interface Task {
		id: string;
		title: string;
	}

	let tasks = $state<Task[]>([
		{ id: '1', title: 'Design review' },
		{ id: '2', title: 'Code review' },
		{ id: '3', title: 'Deploy to prod' }
	]);

	async function onDrop(e: DragDropState<Deal>) {
		const { id, status: currentStatus } = e.draggedItem;
		const data = { status: e.targetContainer };
		if (currentStatus !== data.status) {
			const { data: res } = await apiRequest.patch<ApiResponse<undefined>>(
				`/api/deals/drag/${id}`,
				data
			);
			console.log(data);

			if (!res.success) {
				toast.error('Failed!', { description: res.message });
			} else {
				toast.success('Success!');
			}
			await invalidateAll();
		}
	}
</script>

<svelte:head>
	<title>My CRM | Deals</title>
</svelte:head>

<main class="flex flex-col gap-3">
	<section class="w-full">
		{#if deals}
			<div class="grid w-full grid-cols-5 gap-3 p-4">
				{#each allowedDealStatus as status (status)}
					<div
						class="flex flex-col gap-3 rounded-md bg-accent p-3"
						use:droppable={{
							container: status,
							callbacks: { onDrop }
						}}
					>
						<h1 class="text-center font-semibold underline underline-offset-4">
							{capitalizingText(status)}
						</h1>
						{#each deals.filter((d) => d.status === status) as deal, index (deal.id)}
							<div
								use:draggable={{
									container: index.toString(),
									dragData: deal,
									callbacks: {
										onDragStart: () => {
											isDragging = true;
										},
										onDragEnd: () => {
											isDragging = false;
										}
									}
								}}
							>
								<Card.Root class={cn('cursor-grab', isDragging && 'cursor-grabbing')}>
									<Card.Header>
										<Card.Title>{deal.title}</Card.Title>
									</Card.Header>
								</Card.Root>
							</div>
						{/each}
					</div>
				{/each}
			</div>
		{/if}
	</section>
</main>
