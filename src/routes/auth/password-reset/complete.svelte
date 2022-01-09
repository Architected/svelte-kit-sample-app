<script>
	import { urlConstants } from '../../../helper/urlConstants';
	import { AuthStore } from '../../../store/authStore';
	import { goto } from '$app/navigation';
	import PasswordResetComplete from '../../../components/auth/passwordResetComplete.svelte';
	import AuthLayoutContainer from '../../../components/authLayoutContainer.svelte';
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
