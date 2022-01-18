<script>
	import { urlConstants } from '../../../helper/urlConstants';
	import { AuthStore } from '../../../store/architectedStore';
	import { goto } from '$app/navigation';
	import PasswordResetComplete from '../../../components/auth/passwordResetComplete.svelte';
	import AuthLayoutContainer from '../../../components/layout/authLayoutContainer.svelte';
	import { hasCompleteToken } from '../../../helper/storageHelper';
	import { onMount } from 'svelte';

	onMount(() => {
		if (hasCompleteToken($AuthStore.authState, $AuthStore.bearerToken)) {
			goto(urlConstants.get('PAGE_FILE_LIST'), true);
		}
	});
</script>

<AuthLayoutContainer pageTitle="Password Reset Complete">
	<PasswordResetComplete />
</AuthLayoutContainer>
