<script>
	import { onMount } from 'svelte';
	import { architectedConfig } from '../architectedConfig';
	let root;

	onMount(() => {
		const btn = root.querySelector('button.mobile-menu-button');
		const menu = root.querySelector('.mobile-menu');

		btn.addEventListener('click', (evt) => {
			evt.stopPropagation();
			menu.classList.toggle('hidden');
		});

		document.addEventListener('click', (ec) => {
			let isMobileMenuListClick = ec.target.classList.contains('mobile-menu');
			let isMobileMenuHidden = menu.classList.contains('hidden');

			if (!isMobileMenuListClick && !isMobileMenuHidden) {
				menu.classList.add('hidden');
			}
		});
	});
</script>

<!-- navbar goes here -->
<nav class="bg-gray-100" bind:this={root}>
	<div class="max-w-6xl mx-auto px-4">
		<div class="flex justify-between">
			<!-- site details -->
			<div class="flex space-x-4">
				<div>
					<a href="/" class="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900">
						<span class="font-bold"
							>{architectedConfig.siteName}
							{architectedConfig.appEnv != 'prod' ? ` - [${architectedConfig.appEnv}]` : ''}</span
						>
					</a>
				</div>
			</div>

			<!-- nav -->
			<div class="hidden md:flex items-center space-x-1">
				<a href="/auth/signup" class="py-2 px-4 text-black">Sign Up</a>
				<a href="/auth/signin" class="py-2 px-4 text-black">Sign In</a>
			</div>

			<!-- mobile button -->
			<div class="md:hidden flex items-center">
				<button class="mobile-menu-button">
					<svg
						class="w-6 h-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>

	<!-- mobile menu -->
	<div class="mobile-menu hidden md:hidden">
		<a href="/auth/signup" class="block py-2 px-6 text-sm hover:bg-gray-200">Sign Up</a>
		<a href="/auth/signin" class="block py-2 px-6 text-sm hover:bg-gray-200">Sign In</a>
		<a href="/terms" class="block py-2 px-6 text-sm hover:bg-gray-200">Terms and Conditions</a>
		<a href="/privacy" class="block py-2 px-6 text-sm hover:bg-gray-200">Privacy Policy</a>
	</div>
</nav>
