<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import apiRequest from '$lib/api-request';
	import * as Card from '$lib/components/ui/card';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Badge } from '$lib/components/ui/badge';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { capitalizingText } from '$lib/helpers';
	import { type ApiResponse } from '$lib/types/api-response';
	import { type Deal, type DealWithRelations } from '$lib/types/db-schema-type';
	import { cn } from '$lib/utils';
	import { allowedDealStatus } from '$lib/validators/deal-schema';
	import { Proportions, Eye, Calendar, User, DollarSign } from '@lucide/svelte';
	import { dndState, draggable, droppable, type DragDropState } from '@thisux/sveltednd';
	import { toast } from 'svelte-sonner';
	import type { PageProps } from './$types';

	const { data }: PageProps = $props();

	let deals = $derived(data.deals ?? []);

	let selectedDeal = $state<DealWithRelations | null>(null);
	let isSheetOpen = $state(false);

	function openDealDetail(deal: DealWithRelations) {
		selectedDeal = deal;
		isSheetOpen = true;
	}

	async function onDrop(dropState: DragDropState<Deal>) {
		const { id, status: currentStatus } = dropState.draggedItem;
		const data = { status: dropState.targetContainer };
		if (currentStatus !== data.status) {
			// optimistic ui
			deals = (deals ?? [])
				.map((deal) => {
						if (deal.id === id) {
							return {
								...deal,
								status: data.status as Deal['status'],
								updatedAt: new Date(Date.now())
							};
						}
						return deal;
					});
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

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(value);
	};

	const getColumnTotal = (status: string) => {
		return deals
			.filter((d) => d.status === status)
			.reduce((acc, d) => acc + (d.value ?? 0), 0);
	};
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
					{@const columnTotal = getColumnTotal(status)}
					<div
						class={cn(
							'flex flex-col gap-3 rounded-md border border-border bg-accent/50 p-3 transition-all ease-in-out'
						)}
						use:droppable={{
							container: status,
							callbacks: { onDrop }
						}}
					>
						<div class="flex flex-col gap-1 pb-2">
							<h1 class="text-center font-bold">
								{capitalizingText(status.replace('_', ' '))}
							</h1>
							<div class="text-center text-xs font-medium text-muted-foreground">
								{formatCurrency(columnTotal)}
							</div>
						</div>
						<div class="flex flex-col gap-3">
							{#each deals.filter((d) => d.status === status) as deal, index (deal.id)}
								<div
									use:draggable={{
										container: index.toString(),
										dragData: deal
									}}
								>
									<Card.Root
										class={cn(
											'group relative cursor-grab active:cursor-grabbing',
											dndState.isDragging && 'opacity-50'
										)}
									>
										<Card.Header class="p-4">
											<Card.Title class="text-sm font-semibold">{deal.title}</Card.Title>
											<div class="flex items-center justify-between pt-2">
												<span class="text-xs font-bold text-primary">
													{formatCurrency(deal.value ?? 0)}
												</span>
												<Button
													variant="ghost"
													size="icon"
													class="h-6 w-6 opacity-0 group-hover:opacity-100"
													onclick={() => openDealDetail(deal)}
												>
													<Eye class="h-3 w-3" />
												</Button>
											</div>
										</Card.Header>
									</Card.Root>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</section>

	<Sheet.Root bind:open={isSheetOpen}>
		<Sheet.Content class="sm:max-w-md">
			{#if selectedDeal}
				<Sheet.Header>
					<Sheet.Title>{selectedDeal.title}</Sheet.Title>
					<Sheet.Description>Deal detail and information</Sheet.Description>
				</Sheet.Header>
				<div class="mt-6 flex flex-col gap-6">
					<div class="flex items-center gap-4">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"
						>
							<DollarSign class="h-5 w-5" />
						</div>
						<div>
							<p class="text-sm font-medium text-muted-foreground">Deal Value</p>
							<p class="text-lg font-bold">{formatCurrency(selectedDeal.value ?? 0)}</p>
						</div>
					</div>

					<Separator />

					<div class="grid grid-cols-2 gap-4">
						<div class="flex flex-col gap-1">
							<div class="flex items-center gap-2 text-sm text-muted-foreground">
								<Calendar class="h-4 w-4" />
								Expected Date
							</div>
							<p class="font-medium">{selectedDeal.date ?? 'Not set'}</p>
						</div>
						<div class="flex flex-col gap-1">
							<div class="flex items-center gap-2 text-sm text-muted-foreground">
								<Badge variant="outline">{selectedDeal.status}</Badge>
							</div>
						</div>
					</div>

					<Separator />

					<div class="flex flex-col gap-3">
						<h3 class="text-sm font-semibold">Associated Contact</h3>
						<div class="flex items-center gap-3 rounded-lg border border-border p-3">
							<div class="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
								<User class="h-4 w-4" />
							</div>
							<div class="flex flex-col">
								<span class="text-sm font-medium">{selectedDeal.contact?.name ?? 'N/A'}</span>
								<span class="text-xs text-muted-foreground"
									>{selectedDeal.contact?.email ?? 'N/A'}</span
								>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</Sheet.Content>
	</Sheet.Root>
</main>
