<script>
	export let title;
	export let width;
	export let type = 'button';
	export let onClick;
</script>

<button class={`bg-black text-white px-4 py-3 rounded text-sm ${width}`} {type} on:click={onClick}>
	{title}
</button>
