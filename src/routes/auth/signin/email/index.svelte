<script>
	import { getClientDetails } from '../../../../helper/clientDetails';
	import { urlConstants } from '../../../../helper/urlConstants';
	import { nextStep } from '../../../../helper/scopeHelper';
	import { saveToStore, hasCompleteToken } from '../../../../helper/storageHelper';
	import { AuthStore, authDispatch } from '../../../../store/architectedStore.js';
	import { iamClient } from '../../../../service/setup';
	import EmailSignIn from '../../../../components/auth/emailSignIn.svelte';
	import AuthLayoutContainer from '../../../../components/layout/authLayoutContainer.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		if (hasCompleteToken($AuthStore.authState, $AuthStore.bearerToken)) {
			goto(urlConstants.get('PAGE_FILE_LIST'), true);
		}
	});

	const submitHandler = async ({ email, password }) => {
		const clientDetails = await getClientDetails();
		const requestData = { email, password };
		const responseData = await iamClient.signIn(requestData, clientDetails, authDispatch);

		if (responseData && !responseData.inError) {
			saveToStore('_tokenWrapper', responseData.tokenWrapper);
			var nextUrl = await nextStep(responseData.tokenWrapper);
			goto(nextUrl, true);
		}
	};
</script>

<AuthLayoutContainer pageTitle="Sign in">
	<EmailSignIn
		{submitHandler}
		callInProgress={$AuthStore.callInProgress}
		errorMessage={$AuthStore.errorMessage}
		warningMessage={$AuthStore.warningMessage}
	/>
</AuthLayoutContainer>
