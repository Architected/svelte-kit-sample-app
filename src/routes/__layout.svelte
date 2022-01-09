<script>
	import Nav from '../components/nav.svelte';
	import Footer from '../components/footer.svelte';
	import { AuthStore } from '../store/authStore.js';
	import LeftNav from '../components/leftNav.svelte';
</script>

{#if $AuthStore.authState && $AuthStore.authState.signinScope === 'COMPLETE'}
	<Nav />
	<main class="flex">
		<LeftNav />
		<div class="w-full flex flex-col h-screen overflow-y-hidden">
			<slot />
		</div>
	</main>
{/if}
{#if !$AuthStore.authState || $AuthStore.authState.signinScope !== 'COMPLETE'}
	<div>
		<div class="flex flex-col h-screen">
			<Nav />
			<main class="flex-grow">
				<div class="max-w-6xl mx-auto px-4">
					<slot />
				</div>
			</main>
			<Footer />
		</div>
	</div>
{/if}

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
