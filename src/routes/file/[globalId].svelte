<script context="module">
	export async function load(ctx) {
		let fileId = ctx.params.globalId;
		console.log(fileId);
		return { props: { fileId } };
	}
</script>

<script>
	import { hasCompleteToken } from '../../helper/storageHelper';
	import { AuthStore, authDispatch } from '../../store/authStore';
	import { FileStore, fileDispatch } from '../../store/fileStore';
	import { goto } from '$app/navigation';
	import { urlConstants } from '../../helper/urlConstants';

	import FileDetailContainer from '../../components/file/fileDetailContainer.svelte';

	import { onMount } from 'svelte';
	import {
		getFileAction,
		deleteFileAction,
		updateFileAction
	} from '../../store/actions/fileActions';

	export let fileId;

	onMount(() => {
		if (!hasCompleteToken($AuthStore.authState, $AuthStore.bearerToken, authDispatch)) {
			goto(urlConstants.get('SIGNOUT'), true);
		}
	});

	const retrieveData = async () => {
		await getFileAction(fileId, fileDispatch, $AuthStore.bearerToken.tokenValue);
	};

	const deleteFileHandler = async () => {
		await deleteFileAction(
			$FileStore.file.globalId,
			fileDispatch,
			$AuthStore.bearerToken.tokenValue
		);
		return goto(urlConstants.get('PAGE_FILE_LIST'));
	};

	const updateFileHandler = async (data) => {
		console.log('updateFileHandler:' + JSON.stringify(data));
		var fileUpdateRequest = {
			globalId: fileId,
			name: data.name,
			description: data.description
		};

		await updateFileAction(fileUpdateRequest, fileDispatch, $AuthStore.bearerToken.tokenValue);

		goto(urlConstants.get('PAGE_FILE_LIST'));
	};

	if (hasCompleteToken($AuthStore.authState, $AuthStore.bearerToken, authDispatch)) {
		retrieveData().then(() => {
			console.log(JSON.stringify($FileStore.file));
		});
	}
</script>

<div class="w-full flex flex-col p-5  bg-gray-100">
	<div class="w-full flex flex-row justify-between p-5">
		<div class="flex space-x-4">
			<h2 class="font-bold text-3xl">File Detail</h2>
		</div>
		<div class="flex">
			<div class="mt-2">
				<a
					class="bg-black text-white text-sm py-2 px-4 rounded-lg"
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
