<script>
	import TopNav from '../components/layout/topNav.svelte';
	import Footer from '../components/layout/footer.svelte';
	import { AuthStore } from '../store/authStore.js';
	import LeftNav from '../components/layout/leftNav.svelte';
</script>

{#if $AuthStore.authState && $AuthStore.authState.signinScope === 'COMPLETE'}
	<TopNav />
	<main class="flex flex-row h-screen">
		<LeftNav />
		<slot />
	</main>
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
