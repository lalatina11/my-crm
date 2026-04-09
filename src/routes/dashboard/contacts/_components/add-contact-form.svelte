<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import apiRequest from '$lib/api-request';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Field from '$lib/components/ui/field';
	import Input from '$lib/components/ui/input/input.svelte';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import * as Select from '$lib/components/ui/select';
	import { Textarea } from '$lib/components/ui/textarea';
	import { capitalizingText } from '$lib/helpers';
	import type { ApiResponse } from '$lib/types/api-response';
	import { type Contact } from '$lib/types/db-schema-type';
	import { allowedStatus, contactSchema } from '$lib/validators/contact-schema';
	import { Plus } from '@lucide/svelte';
	import { createForm } from '@tanstack/svelte-form';
	import { capitalizeFirstLetter } from 'better-auth';
	import { toast } from 'svelte-sonner';
	import type { FormEventHandler } from 'svelte/elements';
	let isDialogOpen = $state(false);

	const form = createForm(() => ({
		validators: {
			onSubmit: contactSchema
		},
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			company: '',
			status: '',
			address: '',
			notes: ''
		},
		onSubmit: async ({ value }) => {
			const { data } = await apiRequest.post<ApiResponse<Contact>>('/api/contacts', value);
			if (data.success) {
				form.reset();
				await invalidateAll();
				setDialogOpen('close');
				return toast.success('Success!', { description: 'Success to add new Contact!' });
			}
			toast.error('Failed', { description: data.message });
		}
	}));

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		form.handleSubmit();
	};

	function setDialogOpen(mode?: 'open' | 'close') {
		if (!mode) {
			return (isDialogOpen = !isDialogOpen);
		}
		if (mode === 'open') {
			return (isDialogOpen = true);
		}
		if (mode === 'close') {
			return (isDialogOpen = false);
		}
	}
</script>

<Dialog.Root open={isDialogOpen} onOpenChange={() => setDialogOpen()}>
	<Button onclick={() => setDialogOpen('open')}><Plus /> Add Contact</Button>
	<Dialog.Content>
		<form onsubmit={handleSubmit} class="space-y-3">
			<Dialog.Header>
				<Dialog.Title>Add Contact</Dialog.Title>
				<Dialog.Description>Add new Contact</Dialog.Description>
			</Dialog.Header>
			<ScrollArea class="h-[60vh] pr-4">
				<Field.Group class="my-6">
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
									autocomplete="off"
									placeholder="John Doe"
								/>
								{#if field.state.meta.isTouched && !field.state.meta.isValid}
									<Field.Error errors={[{ message: field.state.meta.errors[0]?.message }]} />
								{/if}
							</Field.Set>
						{/snippet}
					</form.Field>
					<form.Field name="email">
						{#snippet children(field)}
							<Field.Set class="gap-2">
								<Field.Label for={field.name}>Email</Field.Label>
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
									autocomplete="off"
									placeholder="john@email.com"
								/>
								{#if field.state.meta.isTouched && !field.state.meta.isValid}
									<Field.Error errors={[{ message: field.state.meta.errors[0]?.message }]} />
								{/if}
							</Field.Set>
						{/snippet}
					</form.Field>
					<form.Field name="phone">
						{#snippet children(field)}
							<Field.Set class="gap-2">
								<Field.Label for={field.name}>Phone Number</Field.Label>
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
									autocomplete="off"
									placeholder="085888777666"
									type="tel"
								/>
								{#if field.state.meta.isTouched && !field.state.meta.isValid}
									<Field.Error errors={[{ message: field.state.meta.errors[0]?.message }]} />
								{/if}
							</Field.Set>
						{/snippet}
					</form.Field>
					<form.Field name="company">
						{#snippet children(field)}
							<Field.Set class="gap-2">
								<Field.Label for={field.name}>Company</Field.Label>
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
									autocomplete="off"
									placeholder="Evil Corp"
								/>
								{#if field.state.meta.isTouched && !field.state.meta.isValid}
									<Field.Error errors={[{ message: field.state.meta.errors[0]?.message }]} />
								{/if}
							</Field.Set>
						{/snippet}
					</form.Field>
					<form.Field name="status">
						{#snippet children(field)}
							<Field.Set class="gap-2">
								<Field.Label for={field.name}>Status</Field.Label>
								<Select.Root
									type="single"
									value={field.state.value}
									onValueChange={(val) => {
										field.setValue(val as Contact['status']);
										console.log({ val: field.state.value });
									}}
								>
									<Select.Trigger>
										{#if field.state.value}
											{capitalizingText(field.state.value)}
										{:else}
											Select Status
										{/if}
									</Select.Trigger>
									<Select.Content>
										<Select.Group>
											<Select.Label>Status</Select.Label>
											{#each allowedStatus as status (status)}
												<Select.Item
													value={status}
													label={capitalizeFirstLetter(status)}
													disabled={status === field.state.value}
												>
													{capitalizingText(status)}
												</Select.Item>
											{/each}
										</Select.Group>
									</Select.Content>
								</Select.Root>
								{#if field.state.meta.isTouched && !field.state.meta.isValid}
									<Field.Error errors={[{ message: field.state.meta.errors[0]?.message }]} />
								{/if}
							</Field.Set>
						{/snippet}
					</form.Field>
					<form.Field name="address">
						{#snippet children(field)}
							<Field.Set class="gap-2">
								<Field.Label for={field.name}>Address</Field.Label>
								<Textarea
									id={field.name}
									name={field.name}
									value={field.state.value}
									onblur={field.handleBlur}
									oninput={(e) => {
										const { value } = e.target as HTMLInputElement;
										field.handleChange(value);
									}}
									aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
									autocomplete="off"
									placeholder="Jakarta City"
								></Textarea>
								{#if field.state.meta.isTouched && !field.state.meta.isValid}
									<Field.Error errors={[{ message: field.state.meta.errors[0]?.message }]} />
								{/if}
							</Field.Set>
						{/snippet}
					</form.Field>
					<form.Field name="notes">
						{#snippet children(field)}
							<Field.Set class="gap-2">
								<Field.Label for={field.name}>Note</Field.Label>
								<Textarea
									id={field.name}
									name={field.name}
									value={field.state.value}
									onblur={field.handleBlur}
									oninput={(e) => {
										const { value } = e.target as HTMLInputElement;
										field.handleChange(value);
									}}
									aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
									autocomplete="off"
									placeholder="Jakarta City"
								></Textarea>
								{#if field.state.meta.isTouched && !field.state.meta.isValid}
									<Field.Error errors={[{ message: field.state.meta.errors[0]?.message }]} />
								{/if}
							</Field.Set>
						{/snippet}
					</form.Field>
				</Field.Group>
			</ScrollArea>
			<Dialog.Footer>
				<Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close>
				<Button type="submit">Submit</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
