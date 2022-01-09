import { messages } from './messages';

const unexpectedError = (error) => {
	console.log(error);
	const errorResponse = {
		data: {
			inError: true,
			errorMessage: messages.get('UNEXPECTED_ERROR')
		}
	};
	return errorResponse;
};

export { unexpectedError };
