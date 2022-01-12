<script>
	export let errorMessage;
	export let warningMessage;
</script>

{#if errorMessage}
	<div
		class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 w-96"
		role="alert"
	>
		<span class="block sm:inline">{errorMessage}</span>
	</div>
{/if}
{#if warningMessage}
	<p>{warningMessage}</p>
{/if}
