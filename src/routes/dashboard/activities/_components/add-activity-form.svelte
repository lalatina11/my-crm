<script lang="ts">
	import { invalidateAll } from "$app/navigation";
	import apiRequest from "$lib/api-request";
	import { Button, buttonVariants } from "$lib/components/ui/button";
	import * as Dialog from "$lib/components/ui/dialog";
	import * as Field from "$lib/components/ui/field";
	import Input from "$lib/components/ui/input/input.svelte";
	import { ScrollArea } from "$lib/components/ui/scroll-area";
	import * as Select from "$lib/components/ui/select";
	import { Spinner } from "$lib/components/ui/spinner";
	import { Textarea } from "$lib/components/ui/textarea";
	import { capitalizingText } from "$lib/helpers";
	import type { ApiResponse } from "$lib/types/api-response";
	import { type Activity, type Contact, type Deal } from "$lib/types/db-schema-type";
	import {
		allowedActivityStatus,
		allowedActivityTypes,
		activitySchema,
	} from "$lib/validators/activity-schema";
	import { Plus } from "@lucide/svelte";
	import { createForm } from "@tanstack/svelte-form";
	import { toast } from "svelte-sonner";
	import type { FormEventHandler } from "svelte/elements";

	type AllowedActivityStatus = (typeof allowedActivityStatus)[number];
	type AllowedActivityType = (typeof allowedActivityTypes)[number];

	interface Props {
		contacts: Contact[];
		deals: Deal[];
	}

	let { contacts, deals }: Props = $props();

	let isDialogOpen = $state(false);

	const form = createForm(() => ({
		validators: {
			onSubmit: activitySchema,
		},
		defaultValues: {
			type: "" as AllowedActivityType,
			title: "",
			description: "",
			contactId: "",
			dealId: "",
			date: new Date().toISOString().split("T")[0],
			status: "PENDING" as AllowedActivityStatus,
		},
		onSubmit: async ({ value }) => {
			const { data } = await apiRequest.post<ApiResponse<Activity>>("/api/activities", value);
			if (data.success) {
				form.reset();
				await invalidateAll();
				setDialogOpen("close");
				return toast.success("Success!", { description: "Success to add new Activity!" });
			}
			toast.error("Failed", { description: data.message });
		},
	}));

	const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		form.handleSubmit();
	};

	function setDialogOpen(mode?: "open" | "close") {
		if (!mode) {
			return (isDialogOpen = !isDialogOpen);
		}
		if (mode === "open") {
			return (isDialogOpen = true);
		}
		if (mode === "close") {
			return (isDialogOpen = false);
		}
	}

	const formLoadingState = form.useStore((state) => state.isSubmitting);
</script>

<Dialog.Root open={isDialogOpen} onOpenChange={() => setDialogOpen()}>
	<Button onclick={() => setDialogOpen("open")}><Plus /> Activity</Button>
	<Dialog.Content class="w-full md:w-[70vw] lg:w-lg">
		<form onsubmit={handleSubmit} class="space-y-3">
			<Dialog.Header>
				<Dialog.Title>Add Activity</Dialog.Title>
				<Dialog.Description>Add new Activity</Dialog.Description>
			</Dialog.Header>
			<ScrollArea class="h-[60vh]">
				<Field.Group class="p-3 pr-6">
					<form.Field name="title">
						{#snippet children(field)}
							<Field.Set class="gap-2">
								<Field.Label for={field.name}>Title</Field.Label>
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
									placeholder="Meeting with client"
								/>
								{#if field.state.meta.isTouched && !field.state.meta.isValid}
									<Field.Error errors={[{ message: field.state.meta.errors[0]?.message }]} />
								{/if}
							</Field.Set>
						{/snippet}
					</form.Field>

					<form.Field name="type">
						{#snippet children(field)}
							<Field.Set class="gap-2">
								<Field.Label for={field.name}>Type</Field.Label>
								<Select.Root
									type="single"
									value={field.state.value}
									onValueChange={(val) => {
										field.setValue(val as AllowedActivityType);
									}}
								>
									<Select.Trigger>
										{#if field.state.value}
											{capitalizingText(field.state.value)}
										{:else}
											Select Type
										{/if}
									</Select.Trigger>
									<Select.Content>
										<Select.Group>
											<Select.Label>Type</Select.Label>
											{#each allowedActivityTypes as type (type)}
												<Select.Item
													value={type}
													label={capitalizingText(type)}
													disabled={type === field.state.value}
												>
													{capitalizingText(type)}
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

					<form.Field name="status">
						{#snippet children(field)}
							<Field.Set class="gap-2">
								<Field.Label for={field.name}>Status</Field.Label>
								<Select.Root
									type="single"
									value={field.state.value}
									onValueChange={(val) => {
										field.setValue(val as AllowedActivityStatus);
									}}
								>
									<Select.Trigger>
										{#if field.state.value}
											{@const label =
												field.state.value === "ON_PROGRESS"
													? "On Progress"
													: capitalizingText(field.state.value)}
											{label}
										{:else}
											Select Status
										{/if}
									</Select.Trigger>
									<Select.Content>
										<Select.Group>
											<Select.Label>Status</Select.Label>
											{#each allowedActivityStatus as status (status)}
												{@const label =
													status === "ON_PROGRESS" ? "On Progress" : capitalizingText(status)}
												<Select.Item
													value={status}
													label={capitalizingText(status)}
													disabled={status === field.state.value}
												>
													{label}
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

					<form.Field name="contactId">
						{#snippet children(field)}
							<Field.Set class="gap-2">
								<Field.Label for={field.name}>Contact</Field.Label>
								<Select.Root
									type="single"
									value={field.state.value}
									onValueChange={(val) => {
										field.setValue(val);
									}}
								>
									<Select.Trigger>
										{#if field.state.value}
											{contacts.find((c) => c.id === field.state.value)?.name ?? "Select Contact"}
										{:else}
											Select Contact
										{/if}
									</Select.Trigger>
									<Select.Content>
										<Select.Group>
											<Select.Label>Contact</Select.Label>
											{#each contacts as contact (contact.id)}
												<Select.Item
													value={contact.id}
													label={contact.name}
													disabled={contact.id === field.state.value}
												>
													{contact.name}
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

					<form.Field name="dealId">
						{#snippet children(field)}
							<Field.Set class="gap-2">
								<Field.Label for={field.name}>Deal</Field.Label>
								<Select.Root
									type="single"
									value={field.state.value}
									onValueChange={(val) => {
										field.setValue(val);
									}}
								>
									<Select.Trigger>
										{#if field.state.value}
											{deals.find((d) => d.id === field.state.value)?.title ?? "Select Deal"}
										{:else}
											Select Deal
										{/if}
									</Select.Trigger>
									<Select.Content>
										<Select.Group>
											<Select.Label>Deal</Select.Label>
											{#each deals as deal (deal.id)}
												<Select.Item
													value={deal.id}
													label={deal.title || ""}
													disabled={deal.id === field.state.value}
												>
													{deal.title}
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

					<form.Field name="date">
						{#snippet children(field)}
							<Field.Set class="gap-2">
								<Field.Label for={field.name}>Date</Field.Label>
								<Input
									id={field.name}
									name={field.name}
									type="date"
									value={field.state.value}
									onblur={field.handleBlur}
									oninput={(e) => {
										const { value } = e.target as HTMLInputElement;
										field.handleChange(value);
									}}
									aria-invalid={field.state.meta.isTouched && !field.state.meta.isValid}
								/>
								{#if field.state.meta.isTouched && !field.state.meta.isValid}
									<Field.Error errors={[{ message: field.state.meta.errors[0]?.message }]} />
								{/if}
							</Field.Set>
						{/snippet}
					</form.Field>

					<form.Field name="description">
						{#snippet children(field)}
							<Field.Set class="gap-2">
								<Field.Label for={field.name}>Description</Field.Label>
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
									placeholder="Discussed about the new project..."
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
				<Dialog.Close class={buttonVariants({ variant: "outline" })}>Cancel</Dialog.Close>
				<Button disabled={formLoadingState.current} type="submit">
					{#if formLoadingState.current}
						<Spinner />
					{:else}
						Submit
					{/if}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
