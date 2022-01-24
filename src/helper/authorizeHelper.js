import axios from 'axios';

const startAuthorize = async (codeVerifier, clientDetails) => {
	const { ipAddress, userAgent } = clientDetails;

	var request = {
		codeVerifier: codeVerifier,
		ipAddress: ipAddress,
		userAgent: userAgent
	};

	let response;
	console.log('startAuthorize:start');
	try {
		response = await axios.post('/api/connect', request, {
			timeout: 30000
		});
	} catch (error) {
		console.log('startAuthorize:error');
		if (error.response) {
			console.log('error.response.data:' + JSON.stringify(error.response.data));
		} else if (error.request) {
			console.log('error.request:' + JSON.stringify(error.request));
		} else {
			console.log('Error' + error.message);
		}
	}
	console.log('startAuthorize:response' + JSON.stringify(response));
	console.log('startAuthorize:finish');

	return response;
};

export default startAuthorize;
