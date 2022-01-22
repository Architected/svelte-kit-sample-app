<script>
	import { urlConstants } from '../../../helper/urlConstants';
	import { AuthStore, authDispatch } from '../../../store/architectedStore.js';
	import { goto } from '$app/navigation';
	import { iamClient } from '../../../service/setup';
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
		const responseData = await iamClient.passwordResetValidate(
			code,
			authDispatch,
			$AuthStore.bearerToken.tokenValue
		);

		if (responseData && !responseData.inError) {
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
