import { contentService } from '../../../service/setup';
import { unexpectedError } from 'architected-client/helper/unexpectedError';
import dotenv from 'dotenv';

export async function get({ params }) {
	try {
		dotenv.config();

		console.log('contentService.getPageByKey:start');
		const { data } = await contentService.getPageByKey(params.key);
		console.log('contentService.getPageByKey:finish');

		return {
			status: 200,
			body: data
		};
	} catch (err) {
		console.log(err);
		return {
			status: 500,
			body: unexpectedError(err)
		};
	}
}
