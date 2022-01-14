<script>
	import TopNav from '../components/layout/topNav.svelte';
	import Footer from '../components/layout/footer.svelte';
	import { AuthStore } from '../store/authStore.js';
	import LeftNav from '../components/layout/leftNav.svelte';
</script>

{#if $AuthStore.authState && $AuthStore.authState.signinScope === 'COMPLETE'}
	<TopNav />
	<div class="flex">
		<aside class="h-screen sticky top-0"><LeftNav /></aside>
		<main class="w-screen">
			<slot />
		</main>
	</div>
{/if}
{#if !$AuthStore.authState || $AuthStore.authState.signinScope !== 'COMPLETE'}
	<div>
		<div class="flex flex-col h-screen">
			<TopNav />
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
