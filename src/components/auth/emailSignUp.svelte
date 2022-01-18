<script>
	import AuthButton from '../../components/fields/authButton.svelte';
	import MessagePanel from '../../components/fields/messagePanel.svelte';
	import { createForm } from 'svelte-forms-lib';
	import FormField from '../fields/formField.svelte';

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
			if (values.password === '') {
				errs['password'] = 'Please enter your password';
			}
			console.log(values);
			if (!values.terms || values.terms === '') {
				errs['terms'] = 'Please accept the terms and conditions';
			}
			return errs;
		},
		onSubmit: submitHandler
	});
</script>

<div class="flex flex-1 flex-col items-center lg:items-start">
	<h2 class="font-bold text-3xl mb-4">Sign Up</h2>
	<p class="mb-4">Please enter your details</p>
	<form on:submit|preventDefault={handleSubmit}>
		<div class="mb-4">
			<FormField
				id="email"
				title="Email"
				type="text"
				{handleChange}
				value={$form.email}
				error={$errors.email}
			/>
			<FormField
				id="password"
				title="Password"
				type="password"
				{handleChange}
				value={$form.password}
				error={$errors.password}
			/>
			<div class="mb-4">
				<label class="block">
					<input
						class="mr-2"
						type="checkbox"
						id="terms"
						on:change={handleChange}
						bind:value={$form.terms}
					/>
					<span class="text-sm">
						I accept the <a href="/terms" target="_blank">terms and conditions</a></span
					>
				</label>
				{#if $errors.terms}
					<p class="text-red-400 text-sm">{$errors.terms}</p>
				{/if}
			</div>

			<AuthButton title="Sign Up" {callInProgress} />
			<MessagePanel {errorMessage} {warningMessage} />
			<p class="text-sm">Have an account?&nbsp;<a href="/auth/signin/email">Sign in</a></p>
		</div>
	</form>
</div>
