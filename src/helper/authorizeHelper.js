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
			timeout: 30000,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	} catch (error) {
		console.log('startAuthorize:error');
		if (error.response) {
			// The request was made and the server responded with a status code
			// that falls out of the range of 2xx
			console.log('error.response.data:' + JSON.stringify(error.response.data));
			console.log('error.response.status:' + JSON.stringify(error.response.status));
			console.log('error.response.headers:' + JSON.stringify(error.response.headers));
		} else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
			// http.ClientRequest in node.js
			console.log('error.request:' + JSON.stringify(error.request));
		} else {
			// Something happened in setting up the request that triggered an Error
			console.log('Error' + error.message);
		}
		console.log('error.config' + JSON.stringify(error.config));
	}
	console.log('startAuthorize:finish');
	return response;
};

export default startAuthorize;
