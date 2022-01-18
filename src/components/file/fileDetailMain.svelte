<script>
	import FormField from '../fields/formField.svelte';
	import MessagePanel from '../fields/messagePanel.svelte';
	import AuthButton from '../fields/AuthButton.svelte';
	import { createForm } from 'svelte-forms-lib';

	export let file,
		updateFile,
		isUpdatingFile,
		updatingError,
		deleteFile,
		isDeletingFile,
		deletingError;

	let formState;
	let form, errors, state, handleChange, handleSubmit;
	let formInitialised = false;
	$: {
		if (file) {
			formState = createForm({
				initialValues: {
					name: file.name,
					description: file.description
				},
				validate: (values) => {
					let errs = {};
					if (values.name === '') {
						errs['name'] = 'Please enter a title';
					}
					if (values.description === '') {
						errs['description'] = 'Please enter a description';
					}
					return errs;
				},
				onSubmit: updateFile
			});

			({ form, errors, state, handleChange, handleSubmit } = formState);
			formInitialised = true;
		}
	}
</script>

{#if formInitialised}
	<form on:submit|preventDefault={handleSubmit}>
		<div class="flex flex-col sm:flex-row mb-4">
			<div class="text-sm font-bold w-32 ">File Name</div>
			<div>{file != null ? file.fileName : ''}</div>
		</div>
		<FormField
			id="name"
			title="Title"
			type="text"
			placeholder=""
			{handleChange}
			value={$form.name}
			error={$errors.name}
			inputWidth="w-96"
		/>
		<FormField
			id="description"
			title="Description"
			type="text"
			placeholder=""
			{handleChange}
			value={$form.description}
			error={$errors.description}
			inputWidth="w-96"
		/>
		<MessagePanel errorMessage={updatingError} warningMessage="" />
		<MessagePanel errorMessage={deletingError} warningMessage="" />
		<div class="flex flex-col sm:flex-row mt-10 justify-between">
			<div>
				<AuthButton title="Update" callInProgress={isUpdatingFile} width="w-32" onClick="null" />
			</div>
			<div>
				<AuthButton
					title="Delete"
					callInProgress={isDeletingFile}
					type="button"
					onClick={deleteFile}
					width="w-32"
				/>
			</div>
		</div>
	</form>
{/if}
