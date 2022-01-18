<script>
	import { hasCompleteToken } from '../../helper/storageHelper';
	import { AuthStore, authDispatch, FileStore, fileDispatch } from '../../store/architectedStore';
	import { goto } from '$app/navigation';
	import { urlConstants } from '../../helper/urlConstants';

	import { onMount } from 'svelte';
	//import FileUploadModal from '../../components/file/fileUploadModal.svelte';
	import FileListHeader from '../../components/file/fileListHeader.svelte';
	import FileListGrid from '../../components/file/fileListGrid.svelte';
	import * as fileActionType from 'architected-client/constants/file';
	import { fileService } from '../../service/setup';
	import ModalContainer from '../../components/layout/modalContainer.svelte';
	//import FileUpload from '../../components/file/fileUpload.svelte';
	import MessagePanel from '../../components/fields/messagePanel.svelte';
	import AuthButton from '../../components/fields/authButton.svelte';

	const reloadHandler = async () => {
		await fileService.getAllFiles(fileDispatch, $AuthStore.bearerToken.tokenValue);
	};

	onMount(() => {
		if (!hasCompleteToken($AuthStore.authState, $AuthStore.bearerToken, authDispatch)) {
			goto(urlConstants.get('SIGNOUT'), true);
		}
	});

	const initModal = () => {
		fileDispatch({ type: fileActionType.SHOW_MODAL, payload: 'Upload File' });
	};

	const hideModal = () => {
		fileDispatch({ type: fileActionType.HIDE_MODAL });
		fileDispatch({ type: fileActionType.UPDATE_PREVIEW_URL, payload: null });
		resetFileInput();
	};

	const launchCreateFile = (e) => {
		e.preventDefault();
		initModal();
		resetFileInput();
	};

	let currentFile;
	let previewUrl;
	let root;

	const previewFile = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const fileSize = file.size;
		const fileType = file.type;
		const validFile = fileService.validateFileBasic(fileSize, fileType, fileDispatch);

		if (!validFile) return;

		currentFile = e.target.files[0];
		previewUrl = URL.createObjectURL(file);
		console.log('previewUrl' + previewUrl);
		fileDispatch({ type: fileActionType.UPDATE_PREVIEW_URL, payload: previewUrl });
	};

	const resetFileInput = () => {
		var fileInput = root.querySelector('#file');
		if (fileInput) {
			fileInput.value = '';
		}
	};

	const createFile = (e) => {
		const data = {
			file: currentFile
		};

		fileService.uploadFile(data, fileDispatch, $AuthStore.bearerToken.tokenValue).then(() => {
			fileDispatch({ type: fileActionType.UPDATE_PREVIEW_URL, payload: null });
			resetFileInput();
			// var fileInput = root.reloadHandler().then(() => {
			// 	console.log('files reloaded after update');
			// });

			reloadHandler().then(() => {});
		});
	};

	const downloadFileHandler = async (fileGlobalId, fileName) => {
		console.log('fileGlobalId' + fileGlobalId);
		return fileService.downloadFile(fileGlobalId, fileName, $AuthStore.bearerToken.tokenValue);
	};

	if (hasCompleteToken($AuthStore.authState, $AuthStore.bearerToken, authDispatch)) {
		reloadHandler();
	}
</script>

<div class="flex flex-col p-5" bind:this={root}>
	<FileListHeader reloadList={reloadHandler} {launchCreateFile} />
	<FileListGrid
		isLoadingList={$FileStore.isLoadingList}
		loadingError={$FileStore.loadingError}
		files={$FileStore.files}
		downloadFile={downloadFileHandler}
	/>

	<ModalContainer
		id="file-upload"
		displayModal={$FileStore.displayModal}
		modalTitle={$FileStore.modalTitle}
		handleClose={hideModal}
	>
		<form on:submit|preventDefault={createFile}>
			<div class="mb-4 flex flex-col sm:flex-row align-middle">
				<div class="flex flex-col">
					<input
						class="border rounded w-full py-2 px-3 w-96 align-middle"
						type="file"
						id="file"
						placeholder=""
						on:change={previewFile}
					/>
				</div>
			</div>
			{#if $FileStore.previewUrl}
				<div class="mb-4 flex flex-col sm:flex-row align-middle">
					<div class="flex flex-col">
						<img src={$FileStore.previewUrl} width="380" alt="preview" />
					</div>
				</div>
			{/if}
			<MessagePanel errorMessage={$FileStore.saveFileError} warningMessage="" />
			{#if $FileStore.previewUrl || $FileStore.isSavingFile}
				<div class="flex mb-4">
					<AuthButton title="Upload" callInProgress={$FileStore.isSavingFile} width="w-96" />
				</div>
			{/if}
		</form>
	</ModalContainer>
</div>

<!-- <FileUpload
			saveFile={uploadHandler}
			isSavingFile={$FileStore.isSavingFile}
			saveFileError={$FileStore.saveFileError}
			{previewFile}
			previewUrl={$FileStore.previewUrl}
		/> -->
