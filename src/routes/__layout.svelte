<script>
	import Nav from '../components/nav.svelte';
	import Footer from '../components/footer.svelte';
</script>

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

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
