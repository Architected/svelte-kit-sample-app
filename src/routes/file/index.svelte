<script>
	import { hasCompleteToken } from '../../helper/storageHelper';
	import { AuthStore, dispatch } from '../../store/authStore.js';
	import { goto } from '$app/navigation';
	import { urlConstants } from '../../helper/urlConstants';
	import { onMount } from 'svelte';

	onMount(() => {
		if (!hasCompleteToken($AuthStore.authState, $AuthStore.bearerToken, dispatch)) {
			goto(urlConstants.get('SIGNOUT'), true);
		}
	});
</script>

<div class="w-full overflow-x-hidden flex flex-col">
	<main class="w-full flex-grow p-6">
		<div class="flex justify-between">
			<div class="flex space-x-4">
				<h2 class="font-bold text-3xl mt-1 px-2 mb-5">My Files</h2>
			</div>
			<div class="flex items-center space-x-1">
				<div>[refresh]</div>
				<div>[upload]</div>
			</div>
		</div>
		<div>
			<p class="px-2">Todo: Add file upload</p>
			<p class="px-2">Todo: Add file list</p>
		</div>
	</main>
</div>
