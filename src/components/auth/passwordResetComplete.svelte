<script>
	import { urlConstants } from '../../helper/urlConstants';
</script>

<div class="flex flex-1 flex-col items-center lg:items-start">
	<h2 class="font-bold text-3xl mb-4">Password Changed</h2>
	<p class="mb-4">Your password has been successfully updated.</p>
	<a
		class="inline-flex justify-center px-4 py-2 font-semibold leading-6 w-96 text-sm shadow rounded-md text-white bg-black hover:bg-gray-800"
		href={urlConstants.get('SIGNIN')}>Sign In</a
	>
</div>
