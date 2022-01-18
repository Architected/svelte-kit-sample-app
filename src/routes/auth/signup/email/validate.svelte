<script>
	import { urlConstants } from '../../../../helper/urlConstants';
	import { AuthStore, authDispatch } from '../../../../store/architectedStore.js';
	import { goto } from '$app/navigation';
	import { iamService } from '../../../../service/setup';
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
			const responseData = await iamService.signUpValidateEmail(
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
		await iamService.signUpVerifyEmail($AuthStore.bearerToken.tokenValue, dispatch);
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
