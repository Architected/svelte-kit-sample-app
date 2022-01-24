import { unexpectedError } from 'architected-client/helper/unexpectedError.js';
import { connectClient } from '../../../service/setup.js';
import dotenv from 'dotenv';
export async function post(request) {
	try {
		dotenv.config();

		console.log('connectClient.authorize:connectInit:start');
		const authorizeResponse = await connectClient.authorize(request.body);
		console.log('connectClient.authorize:finish');

		return {
			status: 200,
			body: authorizeResponse != null ? authorizeResponse.data : null
		};
	} catch (err) {
		console.log('error calling connectClient.authorize');
		return {
			status: 500,
			body: unexpectedError(err)
		};
	}
}
