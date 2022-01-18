<script>
	import FormField from '../fields/formField.svelte';
	import MessagePanel from '../fields/messagePanel.svelte';
	import AuthButton from '../fields/authButton.svelte';
	import { createForm } from 'svelte-forms-lib';

	export let profile, updateProfile, isUpdatingItem, updatingError;

	let formState;
	let form, errors, state, handleChange, handleSubmit;
	let formInitialised = false;
	$: {
		console.log('profile:' + JSON.stringify(profile));
		if (profile) {
			formState = createForm({
				initialValues: {
					firstName: profile.firstName,
					middleName: profile.middleName,
					lastName: profile.lastName
				},
				validate: (values) => {
					let errs = {};
					if (values.firstName === '') {
						errs['firstName'] = 'Please enter a first name';
					}

					if (values.lastName === '') {
						errs['lastName'] = 'Please enter a last name';
					}
					return errs;
				},
				onSubmit: updateProfile
			});

			({ form, errors, state, handleChange, handleSubmit } = formState);
			formInitialised = true;
		}
	}
</script>

{#if formInitialised}
	<form on:submit|preventDefault={handleSubmit}>
		<FormField
			id="firstName"
			title="First Name"
			type="text"
			placeholder=""
			{handleChange}
			value={$form.firstName}
			error={$errors.firstName}
			inputWidth="w-96"
		/>
		<FormField
			id="middleName"
			title="Middle Name"
			type="text"
			placeholder=""
			{handleChange}
			value={$form.middleName}
			error={$errors.middleName}
			inputWidth="w-96"
		/>
		<FormField
			id="lastName"
			title="Last Name"
			type="text"
			placeholder=""
			{handleChange}
			value={$form.lastName}
			error={$errors.lastName}
			inputWidth="w-96"
		/>
		<MessagePanel errorMessage={updatingError} warningMessage="" />
		<AuthButton title="Update" callInProgress={isUpdatingItem} width="w-32" type="submit" />
	</form>
{/if}
