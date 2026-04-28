<script lang="ts">
	import { page } from "$app/state";
	import * as Card from "$lib/components/ui/card";
	import { resolve } from "$app/paths";
	import LoginForm from "./_components/login-form.svelte";
	import RegisterForm from "./_components/register-form.svelte";
	import { buttonVariants } from "$lib/components/ui/button";
	let searchParams = $derived(page.url.searchParams);
	let isLoginPage = $derived(searchParams.get("tab") !== "register");
</script>

<main class="flex min-h-screen flex-col gap-6 p-4">
	<Card.Root class="mx-auto mt-10 w-full md:w-md">
		{#if isLoginPage}
			<Card.Header>
				<Card.Title>Login</Card.Title>
				<Card.Description>Login into your account</Card.Description>
			</Card.Header>
		{:else}
			<Card.Header>
				<Card.Title>Register</Card.Title>
				<Card.Description>Register your account</Card.Description>
			</Card.Header>
		{/if}
		<Card.Content>
			{#if isLoginPage}
				<LoginForm />
			{:else}
				<RegisterForm />
			{/if}
		</Card.Content>
		<Card.Footer>
			{#if isLoginPage}
				<div>
					Don't have an account? <a
						class={buttonVariants({ variant: "link" })}
						href={resolve(`/auth?tab=register`)}>Register</a
					>
				</div>
			{:else}
				<div>
					Already have an account? <a
						class={buttonVariants({ variant: "link" })}
						href={resolve(`/auth?tab=login`)}>Login</a
					>
				</div>
			{/if}
		</Card.Footer>
	</Card.Root>
</main>
