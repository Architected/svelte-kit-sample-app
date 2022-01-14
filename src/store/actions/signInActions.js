import frontChannelService from '../../service/frontChannelService';
import { getError } from '../../helper/getError';
import { messages } from '../../helper/messages';
import * as authActionType from '../constants/auth';
import { CryptoHelper } from 'architected-client';
import startAuthorize from '../../helper/authorizeHelper';

export const signUpAction = async (email, password, clientDetails, dispatch) => {
	try {
		dispatch({ type: authActionType.USER_SIGNUP_START });

		const cryptoHelper = new CryptoHelper();
		const codeVerifier = cryptoHelper.generateCodeVerifier();
		const authorizeResponse = await startAuthorize(codeVerifier, clientDetails);

		if (!authorizeResponse || authorizeResponse.data.inError) {
			dispatch({
				type: authActionType.USER_SIGNIN_FAIL,
				payload: 'An unexpected error has occurred'
			});
			return authorizeResponse.data;
		}

		const { data } = await frontChannelService()
			.signUp()
			.createAccountWithEmailAndPassword(
				email,
				password,
				authorizeResponse.data.authorizationCode,
				codeVerifier
			);

		if (data.inError) {
			dispatch({
				type: authActionType.USER_SIGNUP_FAIL,
				payload: getError(data)
			});
		} else {
			dispatch({
				type: authActionType.USER_SIGNUP_SUCCESS,
				payload: data.tokenWrapper
			});
		}

		return data;
	} catch (err) {
		console.log(err);
		dispatch({
			type: authActionType.USER_SIGNIN_FAIL,
			payload: messages.get('UNEXPECTED_ERROR')
		});
	}
};

export const validateEmailAction = async (code, tokenValue, dispatch) => {
	try {
		dispatch({ type: authActionType.USER_SIGNUP_VALIDATE_START });
		var frontChannel = frontChannelService();
		const { data } = await frontChannel.signUp().emailValidate(code, tokenValue);

		if (data.inError) {
			console.log();
			dispatch({
				type: authActionType.USER_SIGNUP_VALIDATE_FAIL,
				payload: getError(data)
			});
		} else {
			dispatch({
				type: authActionType.USER_SIGNUP_VALIDATE_SUCCESS,
				payload: data.tokenWrapper
			});
		}

		return data;
	} catch (err) {
		console.log(err);
		dispatch({
			type: authActionType.USER_SIGNUP_VALIDATE_FAIL,
			payload: messages.get('UNEXPECTED_ERROR')
		});
	}
};

export const verifyEmailAction = async (tokenValue, dispatch) => {
	try {
		dispatch({ type: authActionType.USER_SIGNUP_VERIFY_START });
		var frontChannel = frontChannelService();
		const { data } = await frontChannel.signUp().emailVerify(tokenValue);

		if (data.inError) {
			dispatch({
				type: authActionType.USER_SIGNUP_VERIFY_FAIL,
				payload: getError(data)
			});
		} else {
			dispatch({
				type: authActionType.USER_SIGNUP_VERIFY_SUCCESS,
				payload: 'Code resent please check your inbox'
			});
		}

		return data;
	} catch (err) {
		console.log(err);
		dispatch({
			type: authActionType.USER_SIGNUP_VERIFY_FAIL,
			payload: messages.get('UNEXPECTED_ERROR')
		});
	}
};

export const signInAction = async (email, password, clientDetails, dispatch) => {
	try {
		dispatch({ type: authActionType.USER_SIGNIN_START });

		const cryptoHelper = new CryptoHelper();
		const codeVerifier = cryptoHelper.generateCodeVerifier();
		const authorizeResponse = await startAuthorize(codeVerifier, clientDetails);

		if (!authorizeResponse || authorizeResponse.data.inError) {
			dispatch({
				type: authActionType.USER_SIGNIN_FAIL,
				payload: 'An unexpected error has occurred'
			});
			return authorizeResponse.data;
		}

		var frontChannel = frontChannelService();
		const { data } = await frontChannel
			.signIn()
			.signInWithEmailAndPassword(
				email,
				password,
				authorizeResponse.data.authorizationCode,
				codeVerifier
			);

		if (data.inError) {
			dispatch({
				type: authActionType.USER_SIGNIN_FAIL,
				payload: getError(data)
			});
		} else {
			dispatch({
				type: authActionType.USER_SIGNIN_SUCCESS,
				payload: data.tokenWrapper
			});
		}

		return data;
	} catch (err) {
		console.log(err);
		dispatch({
			type: authActionType.USER_SIGNIN_FAIL,
			payload: 'Unexpected error has occurred'
		});
	}
};

export const signOutAction = async (dispatch) => {
	dispatch({ type: authActionType.USER_SIGNIN_CLEAR });
};
