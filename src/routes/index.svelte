<script>
	import { hasValidToken } from '../helper/storageHelper.js';
	import { AuthStore, authDispatch } from '../store/architectedStore.js';
	import { goto } from '$app/navigation';
	import { urlConstants } from '../helper/urlConstants.js';
	import HomeScreen from '../components/homeScreen.svelte';
	import AuthLayoutContainer from '../components/layout/authLayoutContainer.svelte';
	import { onMount } from 'svelte';
	import { architectedConfig } from '../architectedConfig.js';

	onMount(() => {
		if (hasValidToken($AuthStore.authState, $AuthStore.bearerToken, authDispatch)) {
			goto(urlConstants.get('PAGE_FILE_LIST'), true);
		}
		console.log('config:' + JSON.stringify(architectedConfig));
	});
</script>

<AuthLayoutContainer pageTitle="Home">
	<HomeScreen />
</AuthLayoutContainer>
