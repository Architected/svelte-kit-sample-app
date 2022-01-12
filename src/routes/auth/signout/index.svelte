<script>
	import { onMount } from 'svelte';
	import { authDispatch } from '../../../store/authStore.js';
	import { goto } from '$app/navigation';
	import { signOutAction } from '../../../store/actions/signInActions';
	import { deleteFromStore } from '../../../helper/storageHelper';

	onMount(() => {
		deleteFromStore('_tokenWrapper');
		signOutAction(authDispatch).then(() => {
			console.log('signout complete');
			goto('/', true);
		});
	});
</script>

<svelte:head>
	<title>Sign Out</title>
</svelte:head>
