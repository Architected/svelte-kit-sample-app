<script>
	import { urlConstants } from '../../../helper/urlConstants';
	import { AuthStore, dispatch } from '../../../store/authStore.js';
	import { goto } from '$app/navigation';
	import { performAction } from '../../../store/actions/passwordResetActions';
	import PasswordResetPerform from '../../../components/auth/passwordResetPerform.svelte';
	import AuthLayoutContainer from '../../../components/authLayoutContainer.svelte';
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

	const submitHandler = async ({ newPassword, confirmPassword }) => {
		const responseData = await performAction(
			newPassword,
			confirmPassword,
			dispatch,
			$AuthStore.additionalData,
			$AuthStore.bearerToken.tokenValue
		);

		if (responseData && !responseData.inError) {
			goto(urlConstants.get('PASSWORD_RESET_COMPLETE'), true);
		}
	};
</script>

<AuthLayoutContainer pageTitle="Change Password">
	<PasswordResetPerform
		{submitHandler}
		callInProgress={$AuthStore.callInProgress}
		errorMessage={$AuthStore.errorMessage}
		warningMessage={$AuthStore.warningMessage}
	/>
</AuthLayoutContainer>
