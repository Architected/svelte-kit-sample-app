<script>
	import { getClientDetails } from '../../../../helper/clientDetails';
	import { urlConstants } from '../../../../helper/urlConstants';
	import { AuthStore, authDispatch } from '../../../../store/architectedStore.js';
	import { goto } from '$app/navigation';
	import { iamClient } from '../../../../service/setup';
	import EmailSignUp from '../../../../components/auth/emailSignUp.svelte';
	import AuthLayoutContainer from '../../../../components/layout/authLayoutContainer.svelte';
	import { hasCompleteToken } from '../../../../helper/storageHelper';
	import { onMount } from 'svelte';

	onMount(() => {
		if (hasCompleteToken($AuthStore.authState, $AuthStore.bearerToken)) {
			goto(urlConstants.get('PAGE_FILE_LIST'), true);
		}
	});

	const submitHandler = async ({ email, password }) => {
		const clientDetails = await getClientDetails();
		const requestData = { email, password };
		const responseData = await iamClient.signUp(requestData, clientDetails, authDispatch);

		if (responseData && !responseData.inError) {
			if (responseData.tokenWrapper.authState.signupScope === 'FULL') {
				goto(urlConstants.get('PAGE_FILE_LIST'), true);
			}

			goto(urlConstants.get('SIGNUP_EMAIL_VALIDATE'), true);
		}
	};
</script>

<AuthLayoutContainer pageTitle="Sign up">
	<EmailSignUp
		{submitHandler}
		callInProgress={$AuthStore.callInProgress}
		errorMessage={$AuthStore.errorMessage}
		warningMessage={$AuthStore.warningMessage}
	/>
</AuthLayoutContainer>
