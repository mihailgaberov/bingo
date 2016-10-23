/**
 * Created by Mihail on 9/17/2016.
 */

'use strict';

import { EventsConsts } from '../events/events-consts';
import PubSubService from '../events/pubsub-service';
import LocalStorageService from '../local-storage/local-storage-service';
import ViewManipulator from '../utils/view-manipulator';

class ApiController {
	constructor() {
		if (LocalStorageService.isLoggedIn()) {
			ViewManipulator.updateViewState();
		}

		this.pubsub = new PubSubService();
		this.viewCtrl = new ViewManipulator(this.pubsub);
	}

	static login() {
		const loginUrl = "http://localhost:8888/bingo-api/login";
		const elEmail = document.querySelector('#email');
		const elPass = document.querySelector('#password');

		if (elEmail === null || elEmail.value === undefined ||
			elPass === null || elPass.value === undefined) {
			console.log('Not valid user data.');
			return;
		}

		fetch(loginUrl, {
			method: 'POST',
			body: JSON.stringify({
				email: elEmail.value,
				password: elPass.value
			}),
			mode: 'cors',
			redirect: 'follow',
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).then((res) => {
			return res.json();
		}).then((returnedValue) => {
			if (returnedValue.token) {
				ViewManipulator.updateViewState();
				LocalStorageService.saveToken(returnedValue.token);
				ViewManipulator.showUserInfo();
			} else {
				console.log('Show error message for login failed.');
				ViewManipulator.toggleErrorMessageView('Wrong login details.', true);
			}
		}).catch(function (err) {
			console.log('>>> Fetching error: ', err);
		});
	}

	static register() {
		const registerUrl = "http://localhost:8888/bingo-api/register";
		const elName = document.querySelector('#registerName');
		const elEmail = document.querySelector('#regEmail');
		const elPass = document.querySelector('#registerPassword');

		if (elName === null || elName.value === undefined ||
			elEmail === null || elEmail.value === undefined ||
			elPass === null || elPass.value === undefined) {
			console.log('Not valid user data.');
			return;
		}

		fetch(registerUrl, {
			method: 'POST',
			body: JSON.stringify({
				name: elName.value,
				email: elEmail.value,
				password: elPass.value
			}),
			mode: 'cors',
			redirect: 'follow',
			headers: new Headers({
				'Content-Type': 'application/json'
			})
		}).then((res) => {
			return res.json();
		}).then((returnedValue) => {
			if (returnedValue) {
				if (returnedValue.isExisted) {
					ViewManipulator.toggleErrorMessageView('User already existed.', true);
				} else {
					LocalStorageService.saveToken(returnedValue.token);
					ViewManipulator.updateViewState();
				}
			} else {
				console.log('Show error message for registration failed.');
			}
		}).catch(function (err) {
			console.log('>>> Fetching error: ', err);
		});
	}

	logout() {
		LocalStorageService.logout();
		this.pubsub.publish(EventsConsts.LOGOUT, {
			isLogout: true
		});
	}

	static getUserInfo() {
		return LocalStorageService.currentUser();
	}

	static isLogged() {
		return LocalStorageService.isLoggedIn();
	}
}

export default ApiController;