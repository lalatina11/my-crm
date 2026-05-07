<script lang="ts">
	import { Button } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import * as Field from "$lib/components/ui/field";
	import * as InputGroup from "$lib/components/ui/input-group";
	import { Spinner } from "$lib/components/ui/spinner";
	import { updatePasswordSchema } from "$lib/validators/auth-schema";
	import { Eye, EyeOff, Lock } from "@lucide/svelte";
	import { createForm } from "@tanstack/svelte-form";

	type PasswordField = "currentPassword" | "newPassword" | "confirmPassword";

	let showPassword = $state<Record<PasswordField, boolean>>({
		currentPassword: false,
		newPassword: false,
		confirmPassword: false,
	});

	function togglePassword(field: PasswordField) {
		showPassword[field] = !showPassword[field];
	}

	const form = createForm(() => ({
		validators: { onChange: updatePasswordSchema, onSubmit: updatePasswordSchema },
		defaultValues: {
			current_password: "",
			password: "",
			confirm_password: "",
		},
		onSubmit: async ({ value }) => {
			console.log("Password change requested:", value);
			// Functionality to be implemented later
		},
	}));

	const formLoading = form.useStore((state) => state.isSubmitting);
</script>

<svelte:head>
	<title>My CRM | Change Password</title>
</svelte:head>

<main class="mx-auto flex max-w-2xl flex-col gap-6 py-10">
	<section>
		<h1 class="text-3xl font-bold tracking-tight">Security</h1>
		<p class="text-muted-foreground">Manage your password and security settings.</p>
	</section>

	<Card.Root>
		<Card.Header>
			<Card.Title class="flex items-center gap-2">
				<Lock class="h-5 w-5" />
				Change Password
			</Card.Title>
			<Card.Description>
				Ensure your account is using a long, random password to stay secure.
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<form
				onsubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				class="space-y-4"
			>
				<Field.Group>
					<form.Field name="current_password">
						{#snippet children(field)}
							<Field.Set class="gap-2">
								<Field.Label for={field.name}>Current Password</Field.Label>
								<InputGroup.Root>
									<InputGroup.Input
										id={field.name}
										name={field.name}
										type={showPassword.currentPassword ? "text" : "password"}
										value={field.state.value}
										onblur={field.handleBlur}
										oninput={(e) => field.handleChange((e.target as HTMLInputElement).value)}
										placeholder="••••••••"
									/>
									<InputGroup.Addon
										class="cursor-pointer"
										onclick={() => togglePassword("currentPassword")}
										align="inline-end"
									>
										{#if showPassword.currentPassword}
											<EyeOff class="h-4 w-4" />
										{:else}
											<Eye class="h-4 w-4" />
										{/if}
									</InputGroup.Addon>
								</InputGroup.Root>
								{#if field.state.meta.isTouched && !field.state.meta.isValid}
									<Field.Error errors={[{ message: field.state.meta.errors[0]?.message ?? "" }]} />
								{/if}
							</Field.Set>
						{/snippet}
					</form.Field>

					<form.Field name="password">
						{#snippet children(field)}
							<Field.Set class="gap-2">
								<Field.Label for={field.name}>New Password</Field.Label>
								<InputGroup.Root>
									<InputGroup.Input
										id={field.name}
										name={field.name}
										type={showPassword.newPassword ? "text" : "password"}
										value={field.state.value}
										onblur={field.handleBlur}
										oninput={(e) => field.handleChange((e.target as HTMLInputElement).value)}
										placeholder="••••••••"
									/>
									<InputGroup.Addon
										class="cursor-pointer"
										onclick={() => togglePassword("newPassword")}
										align="inline-end"
									>
										{#if showPassword.newPassword}
											<EyeOff class="h-4 w-4" />
										{:else}
											<Eye class="h-4 w-4" />
										{/if}
									</InputGroup.Addon>
								</InputGroup.Root>
								{#if field.state.meta.isTouched && !field.state.meta.isValid}
									<Field.Error errors={[{ message: field.state.meta.errors[0]?.message ?? "" }]} />
								{/if}
							</Field.Set>
						{/snippet}
					</form.Field>

					<form.Field name="confirm_password">
						{#snippet children(field)}
							<Field.Set class="gap-2">
								<Field.Label for={field.name}>Confirm New Password</Field.Label>
								<InputGroup.Root>
									<InputGroup.Input
										id={field.name}
										name={field.name}
										type={showPassword.confirmPassword ? "text" : "password"}
										value={field.state.value}
										onblur={field.handleBlur}
										oninput={(e) => field.handleChange((e.target as HTMLInputElement).value)}
										placeholder="••••••••"
									/>
									<InputGroup.Addon
										class="cursor-pointer"
										onclick={() => togglePassword("confirmPassword")}
										align="inline-end"
									>
										{#if showPassword.confirmPassword}
											<EyeOff class="h-4 w-4" />
										{:else}
											<Eye class="h-4 w-4" />
										{/if}
									</InputGroup.Addon>
								</InputGroup.Root>
								{#if field.state.meta.isTouched && !field.state.meta.isValid}
									<Field.Error errors={[{ message: field.state.meta.errors[0]?.message ?? "" }]} />
								{/if}
							</Field.Set>
						{/snippet}
					</form.Field>
				</Field.Group>

				<Card.Footer class="px-0 pt-4">
					<Button type="submit" disabled={formLoading.current} class="ml-auto">
						{#if formLoading.current}
							<Spinner />
						{:else}
							Update Password
						{/if}
					</Button>
				</Card.Footer>
			</form>
		</Card.Content>
	</Card.Root>
</main>
