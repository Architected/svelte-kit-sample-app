import { unexpectedError } from 'architected-client/helper/unexpectedError';
import { connectService } from '../../../service/setup';
import dotenv from 'dotenv';
export async function post(request) {
	try {
		dotenv.config();

		console.log('connectService.authorize:connectInit:start');
		const authorizeResponse = await connectService.authorize(request.body);
		console.log('connectService.authorize:finish');

		return {
			status: 200,
			body: authorizeResponse.data
		};
	} catch (err) {
		console.log('error calling connectService.authorize');
		return {
			status: 500,
			body: unexpectedError(err)
		};
	}
}
