<script>
	import SubmitButton from '../../components/submitButton.svelte';
	import MessagePanel from '../../components/messagePanel.svelte';
	import { createForm } from 'svelte-forms-lib';
	import FormField from '../formField.svelte';

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
			return errs;
		},
		onSubmit: submitHandler
	});
</script>

<div class="flex flex-1 flex-col items-center lg:items-start">
	<h2 class="font-bold text-3xl mb-4">Sign In</h2>
	<p class="mb-4">Please enter your details</p>
	<form on:submit|preventDefault={handleSubmit}>
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
		<SubmitButton title="Sign In" {callInProgress} />
		<MessagePanel {errorMessage} {warningMessage} />
		<p class="text-sm mb-4">
			Forgotten Password?&nbsp;<a href="/auth/password-reset/start">Click here</a>
		</p>
		<p class="text-sm mb-4">
			Dont have an account?&nbsp;<a href="/auth/signup/email">Sign up</a>
		</p>
	</form>
</div>
