import { writable } from 'svelte/store';
import { fileReducer } from './reducers/file';

export const initialFileState = {
	isLoading: false,
	warningMessage: null,
	errorMessage: null,
	isLoadingList: false,
	isLoadingItem: true,
	loadingError: null,
	isSavingFile: false,
	saveFileError: null,
	isDeletingFile: false,
	deletingError: null,
	isUpdatingFile: false,
	updatingError: null,
	files: [],
	file: {},
	fileCount: 0,
	displayModal: false,
	modalTitle: null
};

export const FileStore = writable(initialFileState);

export const fileDispatch = (action) => {
	FileStore.update((state) => {
		return fileReducer(state, action);
	});
};
