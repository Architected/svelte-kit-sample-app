<script>
	import { urlConstants } from '../../../helper/urlConstants';
	import { AuthStore, authDispatch } from '../../../store/authStore.js';
	import { goto } from '$app/navigation';
	import { validateAction } from '../../../store/actions/passwordResetActions';
	import PasswordResetValidate from '../../../components/auth/passwordResetValidate.svelte';
	import AuthLayoutContainer from '../../../components/layout/authLayoutContainer.svelte';
	import { hasCompleteToken } from '../../../helper/storageHelper';
	import { onMount } from 'svelte';

	onMount(() => {
		if (hasCompleteToken($AuthStore.authState, $AuthStore.bearerToken)) {
			goto(urlConstants.get('PAGE_FILE_LIST'), true);
		}

		if ($AuthStore.bearerToken == null || $AuthStore.bearerToken.tokenValue == null) {
			goto('/', true);
		}
	});

	const submitHandler = async ({ code }) => {
		const responseData = await validateAction(
			code,
			authDispatch,
			$AuthStore.bearerToken.tokenValue
		);
		console.log('responseData.inError' + responseData.inError);
		if (responseData && !responseData.inError) {
			console.log('PASSWORD_RESET_PERFORM:' + urlConstants.get('PASSWORD_RESET_PERFORM'));
			goto(urlConstants.get('PASSWORD_RESET_PERFORM'), true);
		}
	};
</script>

<AuthLayoutContainer pageTitle="Validate Password Reset">
	<PasswordResetValidate
		{submitHandler}
		callInProgress={$AuthStore.callInProgress}
		errorMessage={$AuthStore.errorMessage}
		warningMessage={$AuthStore.warningMessage}
	/>
</AuthLayoutContainer>
