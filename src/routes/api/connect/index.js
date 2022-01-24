import { unexpectedError } from 'architected-client/helper/unexpectedError.js';
import { connectClient } from '../../../service/setup.js';
import dotenv from 'dotenv';
export async function post({ request }) {
	try {
		dotenv.config();

		console.log('connectClient.resolve');
		const body = await request.json();

		console.log('connectClient.authorize:connectInit:start');
		const { data } = await connectClient.authorize(body);

		console.log('connectClient.authorize:finish');

		const returnData = {
			status: 200,
			body: data
		};
		return returnData;
	} catch (err) {
		console.log('error calling connectClient.authorize');
		return {
			status: 500,
			body: unexpectedError(err)
		};
	}
}
