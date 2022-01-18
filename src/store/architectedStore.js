import { writable } from 'svelte/store';
import { authReducer, initialAuthState } from 'architected-client/reducers/iam';
import { fileReducer, initialFileState } from 'architected-client/reducers/file';
import { profileReducer, initialProfileState } from 'architected-client/reducers/profile';

export const AuthStore = writable(initialAuthState);
export const FileStore = writable(initialFileState);
export const ProfileStore = writable(initialProfileState);

export const authDispatch = (action) => {
	AuthStore.update((state) => {
		return authReducer(state, action);
	});
};

export const fileDispatch = (action) => {
	FileStore.update((state) => {
		return fileReducer(state, action);
	});
};

export const profileDispatch = (action) => {
	ProfileStore.update((state) => {
		return profileReducer(state, action);
	});
};
