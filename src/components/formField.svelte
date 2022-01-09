<script>
	export let title, id, type, placeholder, handleChange, value, error;

	function typeAction(node) {
		node.type = type;
	}
</script>

<div class="mb-4">
	<label class="block text-sm font-bold mb-2" for={id}>{title}</label>
	<input
		class="border rounded w-full py-2 px-3 w-96"
		use:typeAction
		{id}
		{placeholder}
		on:change={handleChange}
		bind:value
	/>
	{#if error}
		<p class="text-red-400 text-sm">{error}</p>
	{/if}
</div>
