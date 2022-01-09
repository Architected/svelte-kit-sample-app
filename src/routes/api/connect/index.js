import { architectedSecrets } from '../../../architectedSecrets';
import { unexpectedError } from '../../../helper/unexpectedError';
import connectInit from '../../../service/connectInit';

export async function post(request) {
	try {
		console.log(request.body);
		console.log('connectService.authorize:connectInit:start');
		const connectService = connectInit();
		//console.log('architectedConfig' + JSON.stringify(architectedConfig));
		console.log('architectedSecrets' + JSON.stringify(architectedSecrets));

		const authorizeResponse = await connectService.authorize(request.body);
		console.log('connectService.authorize:finish');
		console.log(JSON.stringify(authorizeResponse.data));
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
