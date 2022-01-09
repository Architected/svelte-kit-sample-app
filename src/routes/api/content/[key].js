import backChannelService from '../../../service/backChannelService';
import { unexpectedError } from '../../../helper/unexpectedError';
import dotenv from 'dotenv';
export async function get({ params }) {
	try {
		dotenv.config();

		console.log('contentService.getPageByKey:start');
		const responseData = await backChannelService().content().getPageByKey(params.key);
		const { data } = responseData;
		console.log('contentService.getPageByKey:finish');

		return {
			status: 200,
			body: data
		};
	} catch (err) {
		console.log('error calling contentService.getPageByKey');
		return {
			status: 500,
			body: unexpectedError(err)
		};
	}
}
