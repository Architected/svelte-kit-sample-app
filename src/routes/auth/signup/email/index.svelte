<script>
	import { getClientDetails } from '../../../../helper/clientDetails';
	import { urlConstants } from '../../../../helper/urlConstants';
	import { AuthStore, dispatch } from '../../../../store/authStore.js';
	import { goto } from '$app/navigation';
	import { signUpAction } from '../../../../store/actions/signInActions';
	import EmailSignUp from '../../../../components/auth/emailSignUp.svelte';
	import AuthLayoutContainer from '../../../../components/authLayoutContainer.svelte';
	import { hasCompleteToken } from '../../../../helper/storageHelper';
	import { onMount } from 'svelte';

	onMount(() => {
		if (hasCompleteToken($AuthStore.authState, $AuthStore.bearerToken)) {
			goto(urlConstants.get('PAGE_FILE_LIST'), true);
		}
	});

	const submitHandler = async ({ email, password }) => {
		const clientDetails = await getClientDetails();
		const responseData = await signUpAction(email, password, clientDetails, dispatch);

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
