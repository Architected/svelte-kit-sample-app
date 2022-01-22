<script>
	import { onMount } from 'svelte';
	import { authDispatch } from '../../../store/architectedStore.js';
	import { goto } from '$app/navigation';
	import { iamClient } from '../../../service/setup';
	import { deleteFromStore } from '../../../helper/storageHelper';

	onMount(() => {
		deleteFromStore('_tokenWrapper');
		iamClient.signOut(authDispatch).then(() => {
			console.log('signout complete');
			goto('/', true);
		});
	});
</script>

<svelte:head>
	<title>Sign Out</title>
</svelte:head>
