import sha256 from 'crypto-js/sha256';
import Base64 from 'crypto-js/enc-base64';
import { UuidTool } from 'uuid-tool';

const alphanumericCharacters =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split('');

export default class CryptoHelper {
	constructor() {
		this.generateCodeVerifier = this.generateCodeVerifier.bind(this);
		this.generateChallenge = this.generateChallenge.bind(this);
		this.generateRandomString = this.generateRandomString.bind(this);
	}

	generateCodeVerifier = () => {
		return this.generateRandomString(100);
	};

	generateChallenge = (value) => {
		console.log('inside generateChallenge');
		const digest = sha256(value);
		return Base64.stringify(digest);
	};

	generateRandomString = (requiredLength) => {
		const characterCount = alphanumericCharacters.length;
		let randomString = '';
		let stringLength = 0;

		while (stringLength < requiredLength) {
			const uuid = UuidTool.newUuid();
			let randomBytes = UuidTool.toBytes(uuid);
			let position = 0;

			while (position < 16 && stringLength < requiredLength) {
				randomString += alphanumericCharacters[randomBytes[position] % characterCount];
				position++;
				stringLength++;
			}
		}

		return randomString;
	};
}
