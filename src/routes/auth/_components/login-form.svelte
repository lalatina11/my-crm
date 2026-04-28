<script lang="ts">
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";
	import { Button } from "$lib/components/ui/button";
	import * as Field from "$lib/components/ui/field";
	import { Input } from "$lib/components/ui/input";
	import * as InputGroup from "$lib/components/ui/input-group";
	import { authClient } from "$lib/hooks/auth-client";
	import { loginSchema } from "$lib/validators/auth-schema";
	import { Eye, EyeOff } from "@lucide/svelte";
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";

	type Passwords = "password" | "confirm_password";

	let formError = $state("");
	let showPassword = $state<Record<Passwords, boolean>>({
		password: false,
		confirm_password: false,
	});

	function switchShowPassword(key: Passwords) {
		showPassword = { ...showPassword, [key]: !showPassword[key] };
	}

	const form = createForm(() => ({
		validators: { onSubmit: loginSchema, onChange: loginSchema },
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			try {
				await authClient.signIn.email(
					{ ...value },
					{
						onError: ({ error }) => {
							toast.error("Failed!", { description: error.message });
							formError = error.message;
						},
						onSuccess: async () => {
							toast.success("Success", { description: "You will redirected to dashboard" });
							await goto(resolve("/dashboard"));
						},
					},
				);
			} catch {
				toast.error("Failed to login", { description: "something went wrong." });
			}
		},
	}));
</script>

<svelte:head>
	<title>My CRM | Login</title>
</svelte:head>

<form
	onsubmit={(e) => {
		e.preventDefault();
		e.stopPropagation();
		form.handleSubmit();
	}}
>
	<Field.Group>
		{#if formError}
			<Field.Error errors={[{ message: formError }]} />
		{/if}
		<form.Field name="email">
			{#snippet children(field)}
				{@const isInvalid = !field.state.meta.isValid && field.state.meta.isTouched}
				<Field.Field data-invalid={isInvalid}>
					<Field.Label for={field.name}>Email</Field.Label>

					<Input
						id={field.name}
						name={field.name}
						value={field.state.value}
						onblur={field.handleBlur}
						aria-invalid={isInvalid}
						autocomplete="off"
						oninput={(e) => {
							const { value } = e.target as HTMLInputElement;
							field.handleChange(value);
						}}
					/>
					{#if isInvalid}
						<Field.Error errors={[{ message: field.state.meta.errors[0]?.message }]} />
					{/if}
				</Field.Field>
			{/snippet}
		</form.Field>
		<form.Field name="password">
			{#snippet children(field)}
				{@const isInvalid = !field.state.meta.isValid && field.state.meta.isTouched}
				<Field.Field data-invalid={isInvalid}>
					<Field.Label for={field.name}>Password</Field.Label>
					<InputGroup.Root>
						<InputGroup.Input
							id={field.name}
							name={field.name}
							value={field.state.value}
							onblur={field.handleBlur}
							aria-invalid={isInvalid}
							autocomplete="off"
							oninput={(e) => {
								const { value } = e.target as HTMLInputElement;
								field.handleChange(value);
							}}
							type={showPassword[field.name] ? "text" : "password"}
						/>
						<InputGroup.Addon
							class="cursor-pointer"
							onclick={() => switchShowPassword(field.name)}
							align="inline-end"
						>
							{#if showPassword[field.name]}
								<EyeOff />
							{:else}
								<Eye />
							{/if}
						</InputGroup.Addon>
					</InputGroup.Root>
					{#if isInvalid}
						<Field.Error errors={[{ message: field.state.meta.errors[0]?.message }]} />
					{/if}
				</Field.Field>
			{/snippet}
		</form.Field>
		<Button type="submit">Submit</Button>
	</Field.Group>
</form>
