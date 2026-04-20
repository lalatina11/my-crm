<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import apiRequest from '$lib/api-request';
	import * as Card from '$lib/components/ui/card';
	import { capitalizingText } from '$lib/helpers';
	import { type ApiResponse } from '$lib/types/api-response';
	import { type Deal } from '$lib/types/db-schema-type';
	import { cn } from '$lib/utils';
	import { allowedDealStatus } from '$lib/validators/deal-schema';
	import { Proportions } from '@lucide/svelte';
	import { dndState, draggable, droppable, type DragDropState } from '@thisux/sveltednd';
	import { toast } from 'svelte-sonner';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	let deals = $derived(data.deals);

	async function onDrop(dropState: DragDropState<Deal>) {
		const { id, status: currentStatus } = dropState.draggedItem;
		const data = { status: dropState.targetContainer };
		if (currentStatus !== data.status) {
			// optimistic ui
			deals = deals
				? deals.map((deal) => {
						if (deal.id === id) {
							return {
								...deal,
								status: data.status as Deal['status'],
								updatedAt: new Date(Date.now())
							};
						}
						return deal;
					})
				: [];
			// optimistic ui END

			const { data: res } = await apiRequest.patch<ApiResponse<undefined>>(
				`/api/deals/drag/${id}`,
				data
			);
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
	<section
		class="hidden min-h-screen items-center justify-center gap-2 lg:hidden portrait:md:flex landscape:md:hidden"
	>
		<span>Please change your orientation to landscape </span>
		<Proportions />
	</section>
	<section
		class="flex min-h-screen flex-col items-center justify-center gap-3 lg:hidden portrait:md:hidden landscape:md:hidden"
	>
		<span>Your device does not support this feature</span>
		<span class="text-5xl"> 😕 </span>
	</section>
	<section class="hidden w-full lg:inline landscape:md:inline">
		{#if deals}
			<div class="grid w-full grid-cols-5 gap-3 p-4">
				{#each allowedDealStatus as status (status)}
					<div
						class={cn('flex flex-col gap-3 rounded-md bg-accent p-3 transition-all ease-in-out')}
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
									dragData: deal
								}}
							>
								<Card.Root class={cn('cursor-grab', dndState.isDragging && 'cursor-grabbing')}>
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
