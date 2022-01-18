<script>
	import FormField from '../fields/formField.svelte';
	import MessagePanel from '../fields/messagePanel.svelte';
	import AuthButton from '../fields/authButton.svelte';
	import { createForm } from 'svelte-forms-lib';

	export let changePassword, callInProgress, warningMessage, errorMessage, successMessage;

	const { form, errors, handleChange, handleSubmit } = createForm({
		initialValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: ''
		},
		validate: (values) => {
			console.log('values:' + JSON.stringify(values));
			let errs = {};
			if (values.currentPassword === '') {
				errs['currentPassword'] = 'Please enter your current password';
			}
			if (values.newPassword === '') {
				errs['newPassword'] = 'Please enter your new password';
			}
			if (values.confirmPassword === '') {
				errs['confirmPassword'] = 'Please confirm your new password';
			}

			if (values.confirmPassword !== values.newPassword) {
				errs['confirmPassword'] = 'Confirmation password must match new password';
			}
			return errs;
		},
		onSubmit: changePassword
	});
</script>

<form on:submit|preventDefault={handleSubmit}>
	<FormField
		id="currentPassword"
		title="Current Password"
		type="password"
		placeholder=""
		{handleChange}
		value={$form.currentPassword}
		error={$errors.currentPassword}
		inputWidth="w-96"
	/>
	<FormField
		id="newPassword"
		title="New Password"
		type="password"
		placeholder=""
		{handleChange}
		value={$form.newPassword}
		error={$errors.newPassword}
		inputWidth="w-96"
	/>
	<FormField
		id="confirmPassword"
		title="Confirm Password"
		type="password"
		placeholder=""
		{handleChange}
		value={$form.confirmPassword}
		error={$errors.confirmPassword}
		inputWidth="w-96"
	/>
	<MessagePanel {errorMessage} {warningMessage} {successMessage} />
	<AuthButton title="Submit" {callInProgress} type="submit" width="w-32" />
</form>
