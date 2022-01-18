export const architectedConfig = {
	apiUrl: import.meta.env.VITE_API_URL,
	appKey: import.meta.env.VITE_APP_KEY,
	appEnv: import.meta.env.VITE_APP_ENV,
	siteName: import.meta.env.VITE_SITE_NAME,
	siteMode: import.meta.env.VITE_SITE_MODE,
	timeout: 30000,
	connectType: 'BC',
	clientType: 'SRV',
	challengeMethod: 'SHA256',
	maxFileSizeMB: 100
};
