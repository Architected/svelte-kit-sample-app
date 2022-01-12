<script>
	export let file;
	export let downloadFile;

	import Fa from 'svelte-fa';
	import { faGlobe, faStroopwafel, faDownload } from '@fortawesome/free-solid-svg-icons';
	import {
		getFileSize,
		getDisplayName,
		isProcessing,
		isProcessed,
		isScanFailed,
		getGridDisplayName
	} from '../../helper/fileHelper';
	import moment from 'moment';
	import { contentTypeIcons, svelteContentTypeMapping } from '../../helper/contentTypeIcons';
</script>

<div class="flex">
	<div class="flex-1">
		<div class="max-w-sm bg-white ring-1 ring-gray-700 ring-opacity-5 shadow-lg rounded-md">
			<a href={`/file/${file.globalId}`}>
				{#if file.hasThumbnail}
					<img
						class="block mb-2 w-full rounded-t-lg"
						src={file.thumbnailPath}
						alt={getDisplayName(file.fileName)}
					/>
				{/if}
				{#if !file.hasThumbnail}
					<i class={svelteContentTypeMapping[contentTypeIcons[file.contentType]]} />
				{/if}
			</a>
			<div class="px-6 py-4">
				<div class="font-bold text-black text-xl mb-2">{getGridDisplayName(file)}</div>
				<ul>
					<li>
						<strong class="text-sm">Created:</strong>&nbsp;{moment(file.createdDate).format(
							'MMM Do YYYY hh:mm'
						)}
					</li>
					<li>
						<strong class="text-sm">Modified:</strong>&nbsp;{moment(file.modifiedDate).format(
							'MMM Do YYYY hh:mm'
						)}
					</li>
					<li>
						<strong class="text-sm">Size:</strong>&nbsp;{getFileSize(file.fileSize)}
					</li>
				</ul>
				<div class="flex justify-between mt-2">
					<div class="flex space-x-4">
						{#if isProcessing(file.fileStatus)}
							<span
								class="inline-flex items-center justify-center px-2 py-2 mr-2 text-xs font-bold leading-none text-green-100 bg-green-600 rounded-full"
								>Processing</span
							>
						{/if}
						{#if isProcessed(file.fileStatus)}
							<span
								class="inline-flex items-center justify-center px-2 py-2 mr-2 text-xs font-bold leading-none text-blue-100 bg-blue-600 rounded-full"
								>Processed</span
							>
						{/if}
						{#if isScanFailed(file.fileStatus)}
							<span
								class="inline-flex items-center justify-center px-2 py-2 mr-2 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full"
								>Scan Failed</span
							>
						{/if}
					</div>
					<div class="flex items-center space-x-1">
						<div>
							{#if file.isTokenCreated}
								<span title="NFT Created">
									<Fa icon={faStroopwafel} size="sm" />
								</span>
							{/if}
						</div>
						<div>
							{#if file.isIPFSLinked}
								<span title="Uploaded to IPFS">
									<Fa icon={faGlobe} size="sm" />
								</span>
							{/if}
						</div>
						<div>
							{#if isProcessed(file.fileStatus)}
								<a
									href={'#'}
									on:click={() => downloadFile(file.globalId, file.fileName)}
									title="Download file"
								>
									<Fa icon={faDownload} size="lg" />
								</a>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
