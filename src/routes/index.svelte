<script>
	import { hasValidToken } from '../helper/storageHelper';
	import { AuthStore, authDispatch } from '../store/architectedStore.js';
	import { goto } from '$app/navigation';
	import { urlConstants } from '../helper/urlConstants';
	import HomeScreen from '../components/homeScreen.svelte';
	import AuthLayoutContainer from '../components/layout/authLayoutContainer.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		if (hasValidToken($AuthStore.authState, $AuthStore.bearerToken, authDispatch)) {
			goto(urlConstants.get('PAGE_FILE_LIST'), true);
		}
	});
</script>

<AuthLayoutContainer pageTitle="Home">
	<HomeScreen />
</AuthLayoutContainer>
