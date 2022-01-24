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
		response = await fetch('/api/connect', {
			method: 'POST',
			body: JSON.stringify(request),
			headers: {
				'content-type': 'application/json'
			},
			timeout: 30000
		});

		const data = await response.json();

		console.log('data:' + JSON.stringify(data));
		return {
			status: data.status || 200,
			props: data,
			data: data
		};
	} catch (e) {
		console.log(e);
		console.log('error-connect call');
	}

	return response;
};

export default startAuthorize;
