<script>
	export let pageTitle;
	export let htmlContent;
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<h2 class="font-bold text-3xl mt-10 px-2 my-2">{pageTitle}</h2>
<div class="px-2">{@html htmlContent}</div>
