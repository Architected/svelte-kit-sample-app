<script>
	import SubmitButton from '../../components/submitButton.svelte';
	import MessagePanel from '../../components/messagePanel.svelte';
	import { createForm } from 'svelte-forms-lib';

	export let submitHandler;
	export let resendHandler;
	export let callInProgress;
	export let errorMessage;
	export let warningMessage;

	const { form, errors, state, handleChange, handleSubmit } = createForm({
		initialValues: {
			code: ''
		},
		validate: (values) => {
			let errs = {};
			if (values.code === '') {
				errs['code'] = 'Please enter your verification code';
			}

			return errs;
		},
		onSubmit: submitHandler
	});
</script>

<div class="flex flex-1 flex-col items-center lg:items-start">
	<h2 class="font-bold text-3xl mb-4">Verify email</h2>
	<p class="mb-4">
		A verification message has been to your inbox. Please enter the verification code below.
	</p>
	<form on:submit|preventDefault={handleSubmit}>
		<div class="mb-4">
			<label class="block text-sm font-bold mb-2" for="code">Verification Code</label>
			<input
				class="border rounded w-full py-2 px-3 w-96"
				id="code"
				type="text"
				placeholder=""
				on:change={handleChange}
				bind:value={$form.code}
			/>
			{#if $errors.code}
				<p class="text-red-400 text-sm">{$errors.code}</p>
			{/if}
		</div>
		<SubmitButton title="Verify" {callInProgress} />
		<MessagePanel {errorMessage} {warningMessage} />
		<p class="text-sm">
			<a href={'#'} on:click|preventDefault={resendHandler}>Resend Verification Code</a>
		</p>
	</form>
</div>
