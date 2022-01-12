<script>
	import FileContainer from './fileCard.svelte';

	export let isLoadingList, loadingError, files, downloadFile;
</script>

<div class="p-5">
	{#if isLoadingList}
		<div class="px-4 py-3 leading-normal text-blue-700 bg-blue-100 rounded-lg">
			<p>Loading files ...</p>
		</div>
	{/if}
	{#if loadingError}
		<div class="px-4 py-3 leading-normal text-red-700 bg-red-100 rounded-lg">
			<p>{loadingError}</p>
		</div>
	{/if}
	{#if files && files.length == 0}
		<div class="px-4 py-3 leading-normal text-blue-700 bg-blue-100 rounded-lg">
			<p>You have not uploaded any files yet!</p>
		</div>
	{/if}
	<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
		{#if files && files.length > 0}
			{#each files as file, i}
				<FileContainer {file} {downloadFile} />
			{/each}
		{/if}
	</div>
</div>
