<script>
	export let file;
	import Fa from 'svelte-fa';
	import { getDisplayName } from 'architected-client/helper/fileHelper.js';
	import { mimeTypeMapping } from 'architected-client/helper/mimeTypeHelper.js';
	import { getGroupIcon } from '../../helper/contentTypeIcons';
</script>

<div class="bg-white">
	{#if file && file.hasThumbnail}
		<div class="flex flex-col sm:flex-row mb-4">
			<div class="text-sm font-bold w-32 ">File Name</div>
			<div>{file != null ? file.fileName : ''}</div>
		</div>
		<img
			class="block mb-2 w-1/4 rounded-lg"
			src={file.thumbnailPath}
			alt={getDisplayName(file.fileName)}
		/>
	{/if}
	{#if file && !file.hasThumbnail}
		<div class="flex items-center p-7">
			<div class="w-full text-center">
				<Fa
					class="inline-block"
					icon={getGroupIcon(mimeTypeMapping[file.contentType])}
					size="10x"
				/>
			</div>
		</div>
	{/if}
</div>
