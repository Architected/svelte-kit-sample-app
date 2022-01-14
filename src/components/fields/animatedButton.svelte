<script>
	export let width = 'w-96';
</script>

<button
	type="button"
	class={`inline-flex justify-center px-4 py-3 font-semibold leading-6 ${width} text-sm shadow rounded text-white bg-black hover:bg-gray-800 transition ease-in-out duration-150 cursor-not-allowed`}
	disabled="true"
>
	<svg
		class="animate-spin h-5 w-5 text-white"
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
	>
		<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
		<path
			class="opacity-75"
			fill="currentColor"
			d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
		/>
	</svg>
</button>
