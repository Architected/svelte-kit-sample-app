<script context="module">
	export async function load(ctx) {
		let fileId = ctx.params.globalId;
		console.log('fileId:' + fileId);
		return { props: { fileId } };
	}
</script>

<script>
	import { hasCompleteToken } from '../../helper/storageHelper';
	import { AuthStore, authDispatch, FileStore, fileDispatch } from '../../store/architectedStore';
	import { goto } from '$app/navigation';
	import { urlConstants } from '../../helper/urlConstants';

	import FileDetailContainer from '../../components/file/fileDetailContainer.svelte';

	import { onMount } from 'svelte';
	import { fileClient } from '../../service/setup';

	export let fileId;

	onMount(() => {
		if (!hasCompleteToken($AuthStore.authState, $AuthStore.bearerToken, authDispatch)) {
			goto(urlConstants.get('SIGNOUT'), true);
		}
	});

	const retrieveData = async () => {
		await fileClient.getFile(fileId, fileDispatch, $AuthStore.bearerToken.tokenValue);
	};

	const deleteFileHandler = async () => {
		const response = await fileClient.deleteFile(
			$FileStore.file.globalId,
			fileDispatch,
			$AuthStore.bearerToken.tokenValue
		);

		if (!response.inError) {
			goto(urlConstants.get('PAGE_FILE_LIST'));
		}
		return goto(urlConstants.get('PAGE_FILE_LIST'));
	};

	const updateFileHandler = async (data) => {
		var fileUpdateRequest = {
			globalId: fileId,
			name: data.name,
			description: data.description
		};

		const response = await fileClient.updateFile(
			fileUpdateRequest,
			fileDispatch,
			$AuthStore.bearerToken.tokenValue
		);

		if (!response.inError) {
			goto(urlConstants.get('PAGE_FILE_LIST'));
		}
	};

	if (hasCompleteToken($AuthStore.authState, $AuthStore.bearerToken, authDispatch)) {
		retrieveData().then(() => {});
	}
</script>

<div class="w-full flex flex-col px-5">
	<div class="w-full flex flex-row justify-between p-5">
		<div class="flex space-x-4">
			<h2 class="font-bold text-3xl">File Detail</h2>
		</div>
		<div class="flex">
			<div class="mt-2">
				<a
					class="bg-black text-white text-sm py-2 px-4 rounded"
					href={urlConstants.get('PAGE_FILE_LIST')}
				>
					Back to file list
				</a>
			</div>
		</div>
	</div>
	<FileDetailContainer
		file={$FileStore.file}
		isLoadingItem={$FileStore.isLoadingItem}
		loadingError={$FileStore.loadingError}
		updateFile={updateFileHandler}
		isUpdatingFile={$FileStore.isUpdatingFile}
		updatingError={$FileStore.updatingError}
		deleteFile={deleteFileHandler}
		isDeletingFile={$FileStore.isDeletingFile}
		deletingError={$FileStore.deletingError}
	/>
</div>
