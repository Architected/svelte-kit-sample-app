<script>
	export let title,
		id,
		type,
		placeholder = undefined,
		handleChange,
		value,
		error,
		inputWidth = 'w-64';

	function typeAction(node) {
		node.type = type;
	}
</script>

<div class="mb-4 flex flex-col sm:flex-row align-middle">
	<label class="block mb-3 text-sm font-bold mt-2 w-32" for={id}>{title}</label>
	<div class="flex flex-col">
		<input
			class={`border rounded w-full py-2 px-3 ${inputWidth} align-middle`}
			use:typeAction
			{id}
			{placeholder}
			on:change={handleChange}
			bind:value
		/>
		{#if error}
			<p class="flex flex-col text-red-400 text-sm">{error}</p>
		{/if}
	</div>
</div>
