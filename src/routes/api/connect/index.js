import { unexpectedError } from '../../../helper/unexpectedError';
import connectInit from '../../../service/connectInit';
import dotenv from 'dotenv';
export async function post(request) {
	try {
		dotenv.config();

		console.log('connectService.authorize:connectInit:start');
		const connectService = connectInit();
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
