<script>
	import { architectedConfig } from '../../architectedConfig';
	const year = new Date().getFullYear();
</script>

<!-- footer goes here -->
<footer class="bg-white">
	<div class="mx-auto px-4">
		<div class="flex justify-between">
			<div class="flex space-x-4">
				<div>
					<a
						href="/"
						class="flex items-center py-10 px-2 text-sm text-gray-700 hover:text-gray-900"
					>
						<span>{year} © {architectedConfig.siteName}</span>
					</a>
				</div>
			</div>
			<div class="hidden md:flex items-center space-x-1">
				<a href="/terms" class="py-10 px-3 text-sm text-true-gray-800">Terms and Conditions</a>
				<a href="/privacy" class="py-10 px-3 text-sm text-true-gray-800">Privacy Policy</a>
			</div>
		</div>
	</div>

	<!-- mobile menu -->
	<div class="mobile-menu hidden md:hidden">
		<a href="/terms" class="block py-2 px-4 text-sm hover:bg-gray-200">Terms and Conditions</a>
		<a href="/privacy" class="block py-2 px-4 text-sm hover:bg-gray-200">Privacy Policy</a>
	</div>
</footer>
