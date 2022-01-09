import dotenv from 'dotenv';

dotenv.config();

export const architectedSecrets = {
	apiKey: process.env.API_KEY,
	apiSecret: process.env.API_SECRET
};
