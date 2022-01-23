import axios from 'axios';

const startAuthorize = async (codeVerifier, clientDetails) => {
	const { ipAddress, userAgent } = clientDetails;

	var request = {
		codeVerifier: codeVerifier,
		ipAddress: ipAddress,
		userAgent: userAgent
	};

	console.log('pre-connect call');
	let response;
	try {
		response = await axios.post('/api/connect', request, {
			timeout: 30000
		});
		console.log('post-connect call');
	} catch (e) {
		console.log(e);
		console.log('error-connect call');
	}

	return response;
};

export default startAuthorize;
