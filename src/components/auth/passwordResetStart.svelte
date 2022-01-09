<script>
	import SubmitButton from '../../components/submitButton.svelte';
	import MessagePanel from '../../components/messagePanel.svelte';
	import { createForm } from 'svelte-forms-lib';

	export let submitHandler;
	export let callInProgress;
	export let errorMessage;
	export let warningMessage;

	const { form, errors, state, handleChange, handleSubmit } = createForm({
		initialValues: {
			email: '',
			password: '',
			terms: ''
		},
		validate: (values) => {
			let errs = {};
			if (values.email === '') {
				errs['email'] = 'Please enter your email';
			}
			return errs;
		},
		onSubmit: submitHandler
	});
</script>

<div class="flex flex-1 flex-col items-center lg:items-start">
	<h2 class="font-bold text-3xl mb-4">Forgotten Password</h2>
	<p class="mb-4 w-96">Please provide your email address to start the password reset process.</p>
	<form on:submit|preventDefault={handleSubmit}>
		<div class="mb-4">
			<label class="block text-sm font-bold mb-2" for="email">Email</label>
			<input
				class="border rounded w-full py-2 px-3 w-96"
				id="email"
				type="text"
				placeholder=""
				on:change={handleChange}
				bind:value={$form.email}
			/>
			{#if $errors.email}
				<p class="text-red-400 text-sm">{$errors.email}</p>
			{/if}
		</div>
		<SubmitButton title="Submit" {callInProgress} />
		<MessagePanel {errorMessage} {warningMessage} />
		<p class="text-sm text-center"><a href="/">Cancel</a></p>
	</form>
</div>
