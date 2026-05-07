<script lang="ts">
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
	import {
		LayoutDashboard,
		Users,
		Users2,
		Target,
		CalendarCheck,
		Menu,
		Heart,
		Send,
		Globe,
		MessageSquare,
		SmartphoneIcon,
		BarChart3,
		CheckCircle2,
	} from "@lucide/svelte";
	import { resolve } from "$app/paths";
	import ModeToggle from "$lib/components/ModeToggle.svelte";

	const features = [
		{
			title: "Contact Management",
			description: "Keep all your customer information in one organized place.",
			icon: Users,
		},
		{
			title: "Deal Tracking",
			description: "Visualize your sales pipeline and track deals from lead to close.",
			icon: Target,
		},
		{
			title: "Activity Logging",
			description: "Never miss a follow-up. Log calls, emails, and meetings easily.",
			icon: CalendarCheck,
		},
		{
			title: "Analytics & Reports",
			description: "Gain insights into your sales performance with detailed reports.",
			icon: BarChart3,
		},
		{
			title: "Team Collaboration",
			description: "Work together with your team to close more deals faster.",
			icon: Users2,
		},
		{
			title: "Mobile Ready",
			description: "Access your CRM on the go with our fully responsive web app.",
			icon: SmartphoneIcon,
		},
	];
</script>

<svelte:head>
	<title>My CRM | Grow Your Business</title>
</svelte:head>

<div class="flex min-h-screen flex-col bg-background text-foreground">
	<!-- Navbar -->
	<header
		class="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
	>
		<div class="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
			<a href={resolve("/")} class="flex items-center gap-2">
				<div
					class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
				>
					<LayoutDashboard size={20} />
				</div>
				<span class="text-xl font-bold tracking-tight">My CRM</span>
			</a>

			<nav class="hidden items-center gap-6 md:flex">
				<a href="#features" class="text-sm font-medium transition-colors hover:text-primary"
					>Features</a
				>
				<a href="#pricing" class="text-sm font-medium transition-colors hover:text-primary"
					>Pricing</a
				>
				<a href="#about" class="text-sm font-medium transition-colors hover:text-primary">About</a>
			</nav>

			<div class="flex items-center gap-4">
				<ModeToggle />
				<div class="hidden gap-2 sm:flex">
					<a href={resolve("/auth")} class={buttonVariants({ variant: "ghost", size: "sm" })}
						>Log in</a
					>
					<a href={resolve("/auth")} class={buttonVariants({ size: "sm" })}>Get Started</a>
				</div>
				<Button variant="ghost" size="icon" class="md:hidden">
					<Menu size={20} />
				</Button>
			</div>
		</div>
	</header>

	<main class="flex-1">
		<!-- Hero Section -->
		<section class="container mx-auto px-4 py-24 text-center sm:px-8 lg:py-32">
			<div class="mx-auto max-w-3xl">
				<h1 class="text-4xl font-extrabold tracking-tight sm:text-6xl">
					Manage your relationships, <span class="text-primary">grow your business</span>
				</h1>
				<p class="mt-6 text-xl text-muted-foreground">
					The all-in-one CRM platform designed for small and medium businesses to streamline sales,
					automate marketing, and provide exceptional customer support.
				</p>
				<div class="mt-10 flex flex-wrap justify-center gap-4">
					<a href={resolve("/auth")} class={buttonVariants({ size: "lg", class: "px-8" })}>
						Start Free Trial
					</a>
					<Button variant="outline" size="lg" class="px-8">View Demo</Button>
				</div>
				<div class="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground">
					<div class="flex items-center gap-2">
						<CheckCircle2 size={16} class="text-primary" />
						No credit card required
					</div>
					<div class="flex items-center gap-2">
						<CheckCircle2 size={16} class="text-primary" />
						14-day free trial
					</div>
				</div>
			</div>
		</section>

		<!-- Features Section -->
		<section id="features" class="bg-muted/50 py-24">
			<div class="container mx-auto px-4 sm:px-8">
				<div class="mb-16 text-center">
					<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
						Everything you need to succeed
					</h2>
					<p class="mt-4 text-lg text-muted-foreground">
						Powerful features to help you manage your customer lifecycle from end to end.
					</p>
				</div>

				<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{#each features as feature (feature.title)}
						<Card class="border-border transition-all hover:border-primary/50 hover:shadow-md">
							<CardHeader>
								<div
									class="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary"
								>
									<feature.icon size={20} />
								</div>
								<CardTitle>{feature.title}</CardTitle>
							</CardHeader>
							<CardContent>
								<p class="text-muted-foreground">{feature.description}</p>
							</CardContent>
						</Card>
					{/each}
				</div>
			</div>
		</section>

		<!-- CTA Section -->
		<section class="container mx-auto px-4 py-24 sm:px-8">
			<div
				class="relative overflow-hidden rounded-3xl bg-primary px-8 py-16 text-primary-foreground shadow-2xl"
			>
				<div class="relative z-10 mx-auto max-w-2xl text-center">
					<h2 class="text-3xl font-bold tracking-tight sm:text-4xl">
						Ready to transform your sales?
					</h2>
					<p class="mt-6 text-lg opacity-90">
						Join thousands of businesses that use My CRM to manage their customer relationships and
						drive growth.
					</p>
					<div class="mt-10 flex flex-wrap justify-center gap-4">
						<a
							href={resolve("/auth")}
							class={buttonVariants({
								size: "lg",
								variant: "secondary",
								class: "px-8",
							})}
						>
							Get Started Now
						</a>
						<Button
							variant="outline"
							size="lg"
							class="border-primary-foreground/20 bg-transparent px-8 hover:bg-primary-foreground/10"
						>
							Talk to Sales
						</Button>
					</div>
				</div>
				<!-- Background pattern -->
				<div class="absolute inset-0 z-0 opacity-10">
					<div
						class="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary-foreground blur-3xl"
					></div>
					<div
						class="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary-foreground blur-3xl"
					></div>
				</div>
			</div>
		</section>
	</main>

	<!-- Footer -->
	<footer class="border-t border-border bg-background py-12">
		<div class="container mx-auto px-4 sm:px-8">
			<div class="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
				<div class="col-span-full lg:col-span-2">
					<div class="flex items-center gap-2">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
						>
							<LayoutDashboard size={20} />
						</div>
						<span class="text-xl font-bold tracking-tight">My CRM</span>
					</div>
					<p class="mt-4 max-w-xs text-sm text-muted-foreground">
						Empowering businesses with modern CRM tools to build lasting customer relationships and
						accelerate growth.
					</p>
					<div class="mt-6 flex gap-4">
						<Button variant="ghost" size="icon" class="h-8 w-8 rounded-full">
							<Send size={18} />
						</Button>
						<Button variant="ghost" size="icon" class="h-8 w-8 rounded-full">
							<Globe size={18} />
						</Button>
						<Button variant="ghost" size="icon" class="h-8 w-8 rounded-full">
							<MessageSquare size={18} />
						</Button>
					</div>
				</div>

				<div>
					<h3 class="mb-4 text-sm font-semibold tracking-wider uppercase">Product</h3>
					<ul class="space-y-2 text-sm text-muted-foreground">
						<li><a href="#features" class="hover:text-primary">Features</a></li>
						<li><a href="#pricing" class="hover:text-primary">Pricing</a></li>
						<li><a href="#demo" class="hover:text-primary">Live Demo</a></li>
						<li><a href="#updates" class="hover:text-primary">Updates</a></li>
					</ul>
				</div>

				<div>
					<h3 class="mb-4 text-sm font-semibold tracking-wider uppercase">Company</h3>
					<ul class="space-y-2 text-sm text-muted-foreground">
						<li><a href="#about" class="hover:text-primary">About Us</a></li>
						<li><a href="#careers" class="hover:text-primary">Careers</a></li>
						<li><a href="#blog" class="hover:text-primary">Blog</a></li>
						<li><a href="#contact" class="hover:text-primary">Contact</a></li>
					</ul>
				</div>

				<div>
					<h3 class="mb-4 text-sm font-semibold tracking-wider uppercase">Legal</h3>
					<ul class="space-y-2 text-sm text-muted-foreground">
						<li><a href="#privacy" class="hover:text-primary">Privacy Policy</a></li>
						<li><a href="#terms" class="hover:text-primary">Terms of Service</a></li>
						<li><a href="#cookies" class="hover:text-primary">Cookie Policy</a></li>
					</ul>
				</div>
			</div>

			<div
				class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row"
			>
				<p class="text-xs text-muted-foreground">
					© {new Date().getFullYear()} My CRM Inc. All rights reserved.
				</p>
				<p class="text-xs text-muted-foreground">
					Designed with <Heart size={12} class="inline text-destructive" /> for better business.
				</p>
			</div>
		</div>
	</footer>
</div>
