<script>
	import { urlConstants } from '../../../helper/urlConstants';
	import { AuthStore } from '../../../store/architectedStore';
	import { goto } from '$app/navigation';
	import SignUpComplete from '../../../components/auth/signUpComplete.svelte';
	import AuthLayoutContainer from '../../../components/layout/authLayoutContainer.svelte';
	import { hasCompleteToken } from '../../../helper/storageHelper';

	if (hasCompleteToken($AuthStore.authState, $AuthStore.bearerToken)) {
		goto(urlConstants.get('PAGE_FILE_LIST'), true);
	}
</script>

<AuthLayoutContainer pageTitle="Sign up complete">
	<SignUpComplete />
</AuthLayoutContainer>
