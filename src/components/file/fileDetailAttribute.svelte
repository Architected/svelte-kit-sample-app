<script>
	import { getFileSize } from '../../helper/fileHelper';

	export let file;
</script>

{#if file}
	<div>
		<div class="flex flex-col sm:flex-row mb-4">
			<div class="text-sm font-bold w-32 ">File Name</div>
			<div>{file.fileName}</div>
		</div>
		<div class="flex flex-col sm:flex-row mb-4">
			<div class="text-sm font-bold w-32 ">File Size</div>
			<div>{getFileSize(file.fileSize)}</div>
		</div>
		<div class="flex flex-col sm:flex-row mb-4">
			<div class="text-sm font-bold w-32 ">File Hash</div>
			<div>{file.fileHash}</div>
		</div>
		<div class="flex flex-col sm:flex-row mb-4">
			<div class="text-sm font-bold w-32 ">File Type</div>
			<div>{file.contentType}</div>
		</div>
		<div class="flex flex-col sm:flex-row mb-4">
			<div class="text-sm font-bold w-32 ">Status</div>
			<div>{file.fileStatus}</div>
		</div>
	</div>
{/if}
