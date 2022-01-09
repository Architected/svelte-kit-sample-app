<script>
	import { getClientDetails } from '../../../helper/clientDetails';
	import { urlConstants } from '../../../helper/urlConstants';
	import { AuthStore, dispatch } from '../../../store/authStore.js';
	import { goto } from '$app/navigation';
	import { startAction } from '../../../store/actions/passwordResetActions';
	import PasswordResetStart from '../../../components/auth/passwordResetStart.svelte';
	import AuthLayoutContainer from '../../../components/authLayoutContainer.svelte';
	import { hasCompleteToken } from '../../../helper/storageHelper';
	import { onMount } from 'svelte';

	onMount(() => {
		if (hasCompleteToken($AuthStore.authState, $AuthStore.bearerToken)) {
			goto(urlConstants.get('PAGE_FILE_LIST'), true);
		}
	});

	const submitHandler = async ({ email }) => {
		const clientDetails = await getClientDetails();
		const responseData = await startAction(email, clientDetails, dispatch);

		if (responseData && !responseData.inError && responseData.tokenWrapper) {
			goto(urlConstants.get('PASSWORD_RESET_VALIDATE'), true);
		}
	};
</script>

<AuthLayoutContainer pageTitle="Password Reset">
	<PasswordResetStart
		{submitHandler}
		callInProgress={$AuthStore.callInProgress}
		errorMessage={$AuthStore.errorMessage}
		warningMessage={$AuthStore.warningMessage}
	/>
</AuthLayoutContainer>
