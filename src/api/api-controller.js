/**
 * Created by Mihail on 9/17/2016.
 */
'use strict';

import { EventsConsts } from '../events/events-consts';
import PubSubService from '../events/pubsub-service';
import LocalStorageService from '../local-storage/local-storage-service';
import DbService from './db-service';
import ViewManipulator from '../utils/view-manipulator';
import { ApiConsts } from './api-consts';

class ApiController {
	constructor() {
		if (LocalStorageService.isLoggedIn()) {
			ViewManipulator.updateViewState(undefined, undefined, LocalStorageService.isLoggedIn());
		}

		this.pubsub = new PubSubService();
		this.viewCtrl = new ViewManipulator(this.pubsub);
	}

	static login() {
		const elEmail = document.querySelector('#email');
		const elPass = document.querySelector('#password');

		if (elEmail === null || elEmail.value === undefined ||
			elPass === null || elPass.value === undefined) {
			console.log('Not valid user data.');
			return;
		}

		const promiseLogin = DbService.loginPlayer(elEmail.value, elPass.value);
		promiseLogin.then((val) => {
			if (val.token) {
				ViewManipulator.updateViewState(undefined, undefined, true);
				LocalStorageService.saveToken(val.token);
				ViewManipulator.showUserInfo();
			} else {
				console.log('Show error message for login failed.');
				ViewManipulator.toggleErrorMessageView(document.querySelector('#alertMsg'),
					'Wrong login details.', true);
			}
		});
	}

	static register() {
		const elName = document.querySelector('#registerName');
		const elEmail = document.querySelector('#regEmail');
		const elPass = document.querySelector('#registerPassword');

		if (elName === null || elName.value === undefined ||
			elEmail === null || elEmail.value === undefined ||
			elPass === null || elPass.value === undefined) {
			console.log('Not valid user data.');
			return;
		}

		const promiseReg = DbService.registerPlayer(elName.value, elEmail.value, elPass.value);
		promiseReg.then((val) => {
			if (val) {
				if (val.isExisted) {
					ViewManipulator.toggleErrorMessageView(document.querySelector('#alertMsg'),
						'User already existed.', true);
				} else {
					LocalStorageService.saveToken(val.token);
					ViewManipulator.updateViewState(undefined, undefined, LocalStorageService.isLoggedIn());
					ViewManipulator.showUserInfo();
				}
			} else {
				console.log('Show error message for registration failed.');
			}
		});
	}

	logout() {
		LocalStorageService.logout();
		this.pubsub.publish(EventsConsts.LOGOUT, {
			isLogout: true
		});
	}

	static getProfileInfo() {
		return LocalStorageService.currentUser();
	}

	static isLogged() {
		return LocalStorageService.isLoggedIn();
	}

	static setNewBalance(sum) {
		fetch(ApiConsts.SET_BALANCE, {
			method: 'POST',
			body: JSON.stringify({
				email: ApiController.getProfileInfo().email,
				isLoggedIn: LocalStorageService.isLoggedIn(),
				balance: sum
			}),
			mode: 'cors',
			redirect: 'follow',
			headers: new Headers({
				'Content-Type': 'application/json',
				Authorization: 'Bearer '+ LocalStorageService.getToken()
			})
		}).then((res) => {
			return res.json();
		}).then((returnedValue) => {
			if (returnedValue) {
				ViewManipulator.updateBalance(ApiController.getProfileInfo().balance, returnedValue.balance);
			} else {
				console.log('Show error message for setting new balance failed.');
			}
		}).catch(function (err) {
			console.log('>>> Fetching error: ', err);
		});
	}

	static getPlayerBalancePromise() {
		return DbService.getPlayerBalance().then((val) => {
			LocalStorageService.saveBalance(val);
			return val;
		});
	}

	static getPlayerBalanceFromStorage() {
		return LocalStorageService.getBalance();
	}
}

export default ApiController;