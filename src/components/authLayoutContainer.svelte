<script>
	import { dispatch } from '../store/authStore.js';
	import * as authActionType from '../store/constants/auth';
	import SidePanel from './sidePanel.svelte';
	export let pageTitle;

	dispatch({ type: authActionType.INIT_AUTH_LAYOUT });
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<section class="relative">
	<div class="container flex flex-col lg:flex-row items-center gap-12 mt-14 lg:mt-28 px-4">
		<slot />
		<SidePanel />
	</div>
</section>
