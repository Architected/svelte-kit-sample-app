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
			code: ''
		},
		validate: (values) => {
			let errs = {};
			if (values.newPassword === '') {
				errs['newPassword'] = 'Please enter your new password';
			}
			if (values.confirmPassword === '') {
				errs['confirmPassword'] = 'Please enter confirm your password';
			}

			if (values.confirmPassword !== values.newPassword) {
				errs['confirmPassword'] = 'Confirmation password must match new password';
			}

			return errs;
		},
		onSubmit: submitHandler
	});
</script>

<div class="flex flex-1 flex-col items-center lg:items-start">
	<h2 class="font-bold text-3xl mb-4">Change Password</h2>
	<p class="mb-4">Please provide your new password.</p>
	<form on:submit|preventDefault={handleSubmit}>
		<div class="mb-4">
			<label class="block text-sm font-bold mb-2" for="password">New Password</label>
			<input
				class="border rounded w-full py-2 px-3 w-96"
				id="newPassword"
				type="password"
				placeholder=""
				on:change={handleChange}
				bind:value={$form.newPassword}
			/>
			{#if $errors.newPassword}
				<p class="text-red-400 text-sm">{$errors.newPassword}</p>
			{/if}
		</div>
		<div class="mb-4">
			<label class="block text-sm font-bold mb-2" for="password">Confirm Password</label>
			<input
				class="border rounded w-full py-2 px-3 w-96"
				id="confirmPassword"
				type="password"
				placeholder=""
				on:change={handleChange}
				bind:value={$form.confirmPassword}
			/>
			{#if $errors.confirmPassword}
				<p class="text-red-400 text-sm">{$errors.confirmPassword}</p>
			{/if}
		</div>
		<SubmitButton title="Submit" {callInProgress} />
		<MessagePanel {errorMessage} {warningMessage} />
	</form>
</div>
