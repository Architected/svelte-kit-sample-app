<script>
	import { hasValidToken } from '../helper/storageHelper';
	import { AuthStore, dispatch } from '../store/authStore.js';
	import { goto } from '$app/navigation';
	import { urlConstants } from '../helper/urlConstants';
	import HomeScreen from '../components/homeScreen.svelte';
	import AuthLayoutContainer from '../components/authLayoutContainer.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		if (hasValidToken($AuthStore.authState, $AuthStore.bearerToken, dispatch)) {
			goto(urlConstants.get('PAGE_FILE_LIST'), true);
		}
	});
</script>

<AuthLayoutContainer pageTitle="Home">
	<HomeScreen />
</AuthLayoutContainer>
