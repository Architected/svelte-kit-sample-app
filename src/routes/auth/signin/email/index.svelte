<script>
	import { getClientDetails } from '../../../../helper/clientDetails';
	import { urlConstants } from '../../../../helper/urlConstants';
	import { nextStep } from '../../../../helper/scopeHelper';
	import { saveToStore, hasCompleteToken } from '../../../../helper/storageHelper';
	import { AuthStore, dispatch } from '../../../../store/authStore.js';
	import { signInAction } from '../../../../store/actions/signInActions';
	import EmailSignIn from '../../../../components/auth/emailSignIn.svelte';
	import AuthLayoutContainer from '../../../../components/authLayoutContainer.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	onMount(() => {
		if (hasCompleteToken($AuthStore.authState, $AuthStore.bearerToken)) {
			goto(urlConstants.get('PAGE_FILE_LIST'), true);
		}
	});

	const submitHandler = async ({ email, password }) => {
		const clientDetails = await getClientDetails();
		const responseData = await signInAction(email, password, clientDetails, dispatch);

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
