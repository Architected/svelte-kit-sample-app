<script>
	import { urlConstants } from '../../../../helper/urlConstants';
	import { AuthStore, authDispatch } from '../../../../store/authStore.js';
	import { goto } from '$app/navigation';
	import { verifyEmailAction, validateEmailAction } from '../../../../store/actions/signInActions';
	import EmailSignUpValidate from '../../../../components/auth/emailSignUpValidate.svelte';
	import AuthLayoutContainer from '../../../../components/layout/authLayoutContainer.svelte';
	import { hasCompleteToken } from '../../../../helper/storageHelper';
	import { onMount } from 'svelte';

	let resendInProgress = false;

	onMount(() => {
		if ($AuthStore.bearerToken == null || $AuthStore.bearerToken.tokenValue == null) {
			goto('/', true);
		}

		if (hasCompleteToken($AuthStore.authState, $AuthStore.bearerToken)) {
			goto(urlConstants.get('PAGE_FILE_LIST'), true);
		}
	});

	const submitHandler = async ({ code }) => {
		if (!resendInProgress) {
			const responseData = await validateEmailAction(
				code,
				$AuthStore.bearerToken.tokenValue,
				authDispatch
			);

			if (responseData && !responseData.inError) {
				goto(urlConstants.get('SIGNUP_COMPLETE'), true);
			}
		}
	};

	const resendHandler = async () => {
		resendInProgress = true;
		await verifyEmailAction($AuthStore.bearerToken.tokenValue, dispatch);
		resendInProgress = false;
	};
</script>

<AuthLayoutContainer pageTitle="Verify email">
	<EmailSignUpValidate
		{submitHandler}
		{resendHandler}
		callInProgress={$AuthStore.callInProgress}
		errorMessage={$AuthStore.errorMessage}
		warningMessage={$AuthStore.warningMessage}
	/>
</AuthLayoutContainer>
