/**
 * Created by Mihail on 9/17/2016.
 */
'use strict';

class LocalStorageService {
	constructor() {}

	static saveToken(token) {
		window.localStorage['mean-token'] = token;
	};

	static saveBalance(balance) {
		window.localStorage['balance'] = balance;
	}

	static getBalance() {
		if (window.localStorage['balance'] !== undefined)
			return window.localStorage['balance'];
	}

	static getToken() {
		if (window.localStorage['mean-token'] !== undefined)
			return window.localStorage['mean-token'];
	};

	static logout() {
		window.localStorage.removeItem('mean-token');
	};

	static isLoggedIn() {
		let token = LocalStorageService.getToken();

		let payload;

		if (token) {
			payload = token.split('.')[1];
			payload = window.atob(payload);
			payload = JSON.parse(payload);

			return payload.exp > Date.now() / 1000;
		} else {
			return false;
		}
	};

	static currentUser() {
		if (LocalStorageService.isLoggedIn()) {
			let token = LocalStorageService.getToken();
			let payload = token.split('.')[1];
			payload = window.atob(payload);
			payload = JSON.parse(payload);
			return {
				email : payload.email,
				name : payload.name,
				balance : payload.balance
			};
		}
	};
}

export default LocalStorageService;

