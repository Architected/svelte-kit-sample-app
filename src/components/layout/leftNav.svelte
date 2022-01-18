<script>
	import Fa from 'svelte-fa';
	import { faFolder } from '@fortawesome/free-solid-svg-icons';
	import { page } from '$app/stores';
</script>

<aside class="border-r-2 border-gray-100 relative h-screen w-72 md:w-64 hidden md:block shadow-xl'">
	<nav class="text-white text-base font-semibold">
		<a
			href="/file"
			class="border-b-2 border-gray-100 flex items-center active-nav-link text-black py-5 pl-10 nav-item {$page.url.pathname.indexOf(
				'file'
			) > -1
				? 'bg-white'
				: ''}"
		>
			<Fa icon={faFolder} size="sm" />
			<p class="ml-2">My Files</p>
		</a>
	</nav>
</aside>
