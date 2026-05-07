<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import * as Table from "$lib/components/ui/table";
	import { Badge } from "$lib/components/ui/badge";
	import { Progress } from "$lib/components/ui/progress";
	import { capitalizingText } from "$lib/helpers";
	import {
		DollarSign,
		Users,
		Briefcase,
		Activity as ActivityIcon,
		TrendingUp,
		Clock,
		CheckCircle2,
	} from "@lucide/svelte";
	import type { PageProps } from "./$types";

	const { data }: PageProps = $props();

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(value);
	};

	const winRate =
		data.metrics.totalDeals > 0
			? Math.round((data.metrics.wonDeals / data.metrics.totalDeals) * 100)
			: 0;

	const metricItems = [
		{
			title: "Total Revenue",
			value: formatCurrency(data.metrics.totalDealValue),
			description: "Sum of all deals",
			icon: DollarSign,
		},
		{
			title: "Active Deals",
			value: data.metrics.activeDeals.toString(),
			description: "Currently in progress",
			icon: Briefcase,
		},
		{
			title: "Total Contacts",
			value: data.metrics.totalContacts.toString(),
			description: "Total reach",
			icon: Users,
		},
		{
			title: "Pending Tasks",
			value: data.metrics.pendingActivities.toString(),
			description: "Needs attention",
			icon: ActivityIcon,
		},
	];
</script>

<svelte:head>
	<title>My CRM | Dashboard</title>
</svelte:head>

<main class="flex flex-col gap-8">
	<section class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
		<div>
			<h1 class="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
			<p class="text-muted-foreground">Welcome back! Here's what's happening with your CRM.</p>
		</div>
		<Card.Root class="w-full md:w-[300px]">
			<Card.Header class="pb-2">
				<div class="flex items-center justify-between">
					<Card.Title class="text-sm font-medium">Win Rate</Card.Title>
					<CheckCircle2 class="h-4 w-4 text-muted-foreground" />
				</div>
			</Card.Header>
			<Card.Content>
				<div class="flex items-center gap-4">
					<Progress value={winRate} class="h-2" />
					<span class="text-sm font-bold">{winRate}%</span>
				</div>
			</Card.Content>
		</Card.Root>
	</section>

	<section class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
		{#each metricItems as item}
			<Card.Root>
				<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
					<Card.Title class="text-sm font-medium">{item.title}</Card.Title>
					<item.icon class="h-4 w-4 text-muted-foreground" />
				</Card.Header>
				<Card.Content>
					<div class="text-2xl font-bold">{item.value}</div>
					<p class="text-xs text-muted-foreground">{item.description}</p>
				</Card.Content>
			</Card.Root>
		{/each}
	</section>

	<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
		<Card.Root class="col-span-4">
			<Card.Header>
				<Card.Title class="flex items-center gap-2">
					<TrendingUp class="h-5 w-5" />
					Recent Deals
				</Card.Title>
				<Card.Description>The latest deals added to your pipeline.</Card.Description>
			</Card.Header>
			<Card.Content>
				<Table.Root>
					<Table.Header>
						<Table.Row>
							<Table.Head>Title</Table.Head>
							<Table.Head>Contact</Table.Head>
							<Table.Head>Value</Table.Head>
							<Table.Head>Status</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each data.recentDeals as deal}
							<Table.Row>
								<Table.Cell class="font-medium">{deal.title}</Table.Cell>
								<Table.Cell>{deal.contact.name}</Table.Cell>
								<Table.Cell>{formatCurrency(deal.value ?? 0)}</Table.Cell>
								<Table.Cell>
									<Badge variant="outline">
										{capitalizingText(deal.status.replace("_", " "))}
									</Badge>
								</Table.Cell>
							</Table.Row>
						{:else}
							<Table.Row>
								<Table.Cell colspan={4} class="h-24 text-center">No recent deals.</Table.Cell>
							</Table.Row>
						{/each}
					</Table.Body>
				</Table.Root>
			</Card.Content>
		</Card.Root>

		<Card.Root class="col-span-3">
			<Card.Header>
				<Card.Title class="flex items-center gap-2">
					<Clock class="h-5 w-5" />
					Recent Activities
				</Card.Title>
				<Card.Description>Your latest interactions.</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="space-y-4">
					{#each data.recentActivities as activity}
						<div class="flex items-center gap-4">
							<div
								class="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted"
							>
								<ActivityIcon class="h-5 w-5 text-primary" />
							</div>
							<div class="flex-1 space-y-1">
								<p class="text-sm leading-none font-medium">{activity.title}</p>
								<p class="text-xs text-muted-foreground">
									{capitalizingText(activity.type)} • {activity.status}
								</p>
							</div>
							<div class="text-xs text-muted-foreground">
								{new Date(activity.date).toLocaleDateString()}
							</div>
						</div>
					{:else}
						<p class="py-4 text-center text-sm text-muted-foreground">No recent activities.</p>
					{/each}
				</div>
			</Card.Content>
		</Card.Root>
	</div>
</main>
