<script>
	import FormField from '../fields/formField.svelte';
	import MessagePanel from '../fields/messagePanel.svelte';
	import AuthButton from '../fields/authButton.svelte';

	export let saveFile, isSavingFile, saveFileError, previewFile, previewUrl;

	const { form, errors, state, handleChange, handleSubmit } = createForm({
		initialValues: {
			fred: null
			// name: '',
			// description: ''
		},
		validate: (values) => {
			let errs = {};

			console.log('validate:values:' + JSON.stringify(values));
			// console.log('form:' + JSON.stringify($form));
			// console.log('form:' + JSON.stringify(form));
			if (previewUrl === '') {
				errs['fred'] = 'Please select a file';
			}

			// if (values.name === '') {
			// 	errs['name'] = 'Please enter a title';
			// }

			// if (values.description === '') {
			// 	errs['description'] = 'Please enter a description';
			// }

			return errs;
		},
		onSubmit: saveFile
	});

	console.log('fileUpload:previewUrl:' + previewUrl);
</script>

<form on:submit|preventDefault={handleSubmit}>
	<div class="mb-4 flex flex-col sm:flex-row align-middle">
		<label class="block mb-3 text-sm font-bold mt-2 w-32" for="fred">File</label>
		<div class="flex flex-col">
			<input
				class="border rounded w-full py-2 px-3 w-96 align-middle"
				type="file"
				id="fred"
				placeholder=""
				on:change={previewFile}
			/>
		</div>
	</div>
	{#if previewUrl}
		<div class="mb-4 flex flex-col sm:flex-row align-middle">
			<div class="block mb-3 text-sm font-bold mt-2 w-32">Preview</div>
			<div class="flex flex-col">
				<img src={previewUrl} width="250" alt="preview" />
			</div>
		</div>
	{/if}

	<!-- <FormField
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
	/> -->

	<MessagePanel errorMessage={saveFileError} warningMessage="" />
	<div class="flex mb-4 ">
		<AuthButton title="Save File" callInProgress={isSavingFile} width="w-64" />
	</div>
</form>
