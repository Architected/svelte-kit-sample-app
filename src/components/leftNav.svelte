<script>
	import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
	import { faFolder } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
	let root;

	// https://svelte.dev/tutorial/onmount
	onMount(() => {});
</script>

<aside class="bg-gray-800 relative h-screen w-72 md:w-64 hidden md:block shadow-xl'">
	<nav class="text-white text-base font-semibold">
		<a
			href="/file"
			class="flex items-center active-nav-link text-white py-4 pl-6 nav-item {$page.url.pathname ==
			'/file'
				? 'bg-gray-500'
				: ''}"
		>
			<Fa icon={faFolder} size="sm" />
			<p class="ml-2">My Files</p>
		</a>
	</nav>
</aside>
