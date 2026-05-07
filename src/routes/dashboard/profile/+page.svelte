<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import apiRequest from "$lib/api-request";
	import * as Avatar from "$lib/components/ui/avatar";
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import * as Card from "$lib/components/ui/card";
	import * as Field from "$lib/components/ui/field";
	import { Input } from "$lib/components/ui/input";
	import { Spinner } from "$lib/components/ui/spinner";
	import { profileSchema } from "$lib/validators/user-schema";
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import type { PageProps } from "./$types";
	import type { ApiResponse } from "$lib/types/api-response";
	import Label from "$lib/components/ui/label/label.svelte";
	import { authClient } from "$lib/hooks/auth-client";

	const { data }: PageProps = $props();

	let selectedImage = $state<string | null>(null);
	let previewImage = $derived(selectedImage ?? data.user.image ?? null);
	const session = authClient.useSession();

	const form = createForm(() => ({
		validators: {
			onSubmit: profileSchema,
		},
		defaultValues: {
			name: data.user.name ?? "",
			email: data.user.email ?? "",
			image: null as Blob | null,
		},
		onSubmit: async ({ value }) => {
			try {
				const formData = new FormData();
				formData.append("name", value.name);
				formData.append("email", value.email);
				if (value.image) {
					formData.append("image", value.image as Blob);
				}

				const { data: res } = await apiRequest.patch<ApiResponse<undefined>>(
					"/api/profile",
					formData,
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					},
				);
				if (res.success) {
					toast.success("Success!", { description: res.message });
					selectedImage = null;
					await invalidateAll();
					await $session.refetch();
				} else {
					toast.error("Failed", { description: res.message });
				}
			} catch {
				toast.error("Error", { description: "Something went wrong" });
			}
		},
	}));

	const formLoading = form.useStore((state) => state.isSubmitting);
</script>

<svelte:head>
	<title>My CRM | Profile</title>
</svelte:head>

<main class="mx-auto flex max-w-2xl flex-col gap-6 py-10">
	<section>
		<h1 class="text-3xl font-bold tracking-tight">Profile Settings</h1>
		<p class="text-muted-foreground">Manage your account settings and profile information.</p>
	</section>

	<Card.Root>
		<Card.Header>
			<Card.Title>Profile Information</Card.Title>
			<Card.Description>Update your account details.</Card.Description>
		</Card.Header>
		<Card.Content>
			<form
				onsubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				class="space-y-6"
			>
				<div class="flex items-center gap-6 pb-4">
					<Avatar.Root class="h-24 w-24 border">
						<Avatar.Image src={data.user.image} alt={data.user.name} />
						<Avatar.Fallback class="text-2xl">{data.user.name?.charAt(0)}</Avatar.Fallback>
					</Avatar.Root>
					<div>
						<h3 class="text-lg font-medium">{data.user.name}</h3>
						<p class="text-sm text-muted-foreground">{data.user.email}</p>
					</div>
				</div>

				<Field.Group>
					<form.Field name="name">
						{#snippet children(field)}
							<Field.Set class="gap-2">
								<Field.Label for={field.name}>Name</Field.Label>
								<Input
									id={field.name}
									name={field.name}
									value={field.state.value}
									onblur={field.handleBlur}
									oninput={(e) => {
										const { value } = e.target as HTMLInputElement;
										field.handleChange(value);
									}}
									aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
									autocomplete="name"
								/>
								{#if field.state.meta.isTouched && !field.state.meta.isValid}
									<Field.Error errors={[{ message: field.state.meta.errors[0]?.message ?? "" }]} />
								{/if}
							</Field.Set>
						{/snippet}
					</form.Field>

					<form.Field name="email">
						{#snippet children(field)}
							<Field.Set class="gap-2">
								<Field.Label for={field.name}>Email Address</Field.Label>
								<Input
									id={field.name}
									name={field.name}
									type="email"
									value={field.state.value}
									onblur={field.handleBlur}
									oninput={(e) => {
										const { value } = e.target as HTMLInputElement;
										field.handleChange(value);
									}}
									aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
									autocomplete="email"
								/>
								{#if field.state.meta.isTouched && !field.state.meta.isValid}
									<Field.Error errors={[{ message: field.state.meta.errors[0]?.message ?? "" }]} />
								{/if}
							</Field.Set>
						{/snippet}
					</form.Field>

					<form.Field name="image">
						{#snippet children(field)}
							<Field.Set class="gap-2">
								<Field.Label for={field.name}>Profile Picture</Field.Label>
								<input
									hidden
									id={field.name}
									name={field.name}
									type="file"
									accept="image/*"
									onblur={field.handleBlur}
									onchange={(e) => {
										const target = e.target as HTMLInputElement;
										const file = target.files?.[0];
										if (file) {
											field.handleChange(file);
											const reader = new FileReader();
											reader.onload = (e) => {
												selectedImage = e.target?.result as string;
											};
											reader.readAsDataURL(file);
											selectedImage = URL.createObjectURL(file);
										}
									}}
									aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
								/>
								<div class="mx-auto flex w-1/2 flex-col gap-3">
									<img
										src={previewImage ?? data.user.image}
										alt="..."
										class="h-auto w-full object-cover"
									/>
									<Label class={buttonVariants()} for={field.name}>Change</Label>
								</div>
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
							Save Changes
						{/if}
					</Button>
				</Card.Footer>
			</form>
		</Card.Content>
	</Card.Root>
</main>
