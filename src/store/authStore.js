import { writable } from 'svelte/store';
import { authReducer } from './reducers/auth';

const initialAuthState = {
	isAuthFlow: false,
	authState: null,
	bearerToken: null,
	additionalData: null,
	callInProgress: false,
	warningMessage: null,
	errorMessage: null,
	loggedIn: false
};

export const AuthStore = writable(initialAuthState);

export const dispatch = (action) => {
	AuthStore.update((state) => {
		return authReducer(state, action);
	});
};
