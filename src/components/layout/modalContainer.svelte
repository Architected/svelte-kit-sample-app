<script>
	export let id;
	export let displayModal;
	export let modalTitle;
	export let handleClose;
</script>

<div class={`${id} ${displayModal ? '' : 'hidden'} container flex justify-center mx-auto`}>
	<div class="absolute inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
		<div class="max-w-4xl px-5 bg-white">
			<div class="flex items-center justify-between border-b-2 border-gray-200 py-5">
				<h3 class="text-2xl text-bold">{modalTitle}</h3>
				<a href={'#'} on:click={handleClose}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-6 h-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</a>
			</div>
			<div class="mt-4">
				<slot />
			</div>
		</div>
	</div>
</div>
