import frontChannelService from '../../service/frontChannelService';
import { getError } from '../../helper/getError';
import * as authActionType from '../constants/auth';
import { CryptoHelper } from 'architected-client';
import startAuthorize from '../../helper/authorizeHelper';

export const startAction = async (email, clientDetails, dispatch) => {
	try {
		dispatch({ type: authActionType.PASSWORD_RESET_START });

		const cryptoHelper = new CryptoHelper();
		const codeVerifier = await cryptoHelper.generateCodeVerifier();

		const authorizeResponse = await startAuthorize(codeVerifier, clientDetails);

		if (!authorizeResponse || authorizeResponse.data.inError) {
			dispatch({
				type: authActionType.PASSWORD_RESET_FAIL,
				payload: 'An unexpected error has occurred'
			});
			return authorizeResponse.data;
		}

		var frontChannel = frontChannelService();
		const { data } = await frontChannel
			.passwordReset()
			.start(email, authorizeResponse.data.authorizationCode, codeVerifier);

		if (data.inError) {
			dispatch({
				type: authActionType.PASSWORD_RESET_FAIL,
				payload: getError(data)
			});
		} else {
			if (!data.tokenWrapper) {
				dispatch({
					type: authActionType.PASSWORD_RESET_FAIL,
					payload: 'This email does not exist as a user in the system'
				});
			} else {
				dispatch({
					type: authActionType.PASSWORD_RESET_SUCCESS,
					payload: data.tokenWrapper
				});
			}

			return data;
		}
	} catch (err) {
		console.log(err.toString());
		dispatch({
			type: authActionType.PASSWORD_RESET_FAIL,
			payload: err.toString()
		});
	}
};

export const validateAction = async (code, dispatch, tokenValue) => {
	try {
		dispatch({ type: authActionType.PASSWORD_RESET_VALIDATE_START });

		var frontChannel = frontChannelService();
		const { data } = await frontChannel.passwordReset().validate(code, tokenValue);

		if (data.inError) {
			dispatch({
				type: authActionType.PASSWORD_RESET_VALIDATE_FAIL,
				payload: getError(data)
			});
		} else {
			dispatch({
				type: authActionType.PASSWORD_RESET_VALIDATE_SUCCESS,
				payload: data.tokenWrapper
			});
		}
		console.log('validateAction:response');
		console.log(JSON.stringify(data));
		return data;
	} catch (err) {
		console.log(err.toString());
		dispatch({
			type: authActionType.PASSWORD_RESET_VALIDATE_FAIL,
			payload: err.toString()
		});
	}
};

export const performAction = async (
	newPassword,
	confirmPassword,
	dispatch,
	additionalData,
	tokenValue
) => {
	try {
		dispatch({ type: authActionType.PASSWORD_RESET_PERFORM_START });

		var frontChannel = frontChannelService();
		const { data } = await frontChannel
			.passwordReset()
			.perform(newPassword, confirmPassword, additionalData, tokenValue);

		if (data.inError) {
			dispatch({
				type: authActionType.PASSWORD_RESET_PERFORM_FAIL,
				payload: getError(data)
			});
		} else {
			dispatch({
				type: authActionType.PASSWORD_RESET_PERFORM_SUCCESS,
				payload: null
			});
		}
		return data;
	} catch (err) {
		console.log(err.toString());
		dispatch({
			type: authActionType.PASSWORD_RESET_PERFORM_FAIL,
			payload: 'Unable to perform password reset'
		});
	}
};

export const changeAction = async (newPassword, confirmPassword, dispatch, tokenValue) => {
	try {
		dispatch({ type: authActionType.PASSWORD_RESET_CHANGE_START });

		var frontChannel = frontChannelService();
		const { data } = await frontChannel
			.passwordReset()
			.change(newPassword, confirmPassword, tokenValue);

		if (data.inError) {
			dispatch({
				type: authActionType.PASSWORD_RESET_CHANGE_FAIL,
				payload: getError(data)
			});
		} else {
			dispatch({
				type: authActionType.PASSWORD_RESET_CHANGE_SUCCESS,
				payload: null
			});
		}
		return data;
	} catch (err) {
		console.log(err.toString());
		dispatch({
			type: authActionType.PASSWORD_RESET_CHANGE_FAIL,
			payload: 'Unable to perform password change'
		});
	}
};
