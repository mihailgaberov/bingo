/**
 * Created by Mihail on 9/17/2016.
 */

'use strict';

import LocalStorageService from '../local-storage/local-storage-service';
//import AlertMessagesService from '../alert-messages/alert-messages-service';
import ViewController from '../utils/view-controller';

class ApiController {
	constructor() {
		// Check if the user is already logged in
		if (LocalStorageService.isLoggedIn()) {
			ViewController.showGameScreen();
		}

		this.viewCtrl = new ViewController();
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
				ViewController.showGameScreen();
				LocalStorageService.saveToken(returnedValue.token);
				ViewController.showUserInfo();
			} else {
				console.log('Show error message for login failed.');
				ViewController.toggleErrorMessageView('Wrong login details.', true);
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
					ViewController.toggleErrorMessageView('User already existed.', false);
				} else {
					LocalStorageService.saveToken(returnedValue.token);
					ViewController.showGameScreen();
				}
			} else {
				console.log('Show error message for registration failed.');
			}
		}).catch(function (err) {
			console.log('>>> Fetching error: ', err);
		});
	}

	static logout() {
		LocalStorageService.logout();

		ViewController.updateViewState();
	}

	static getUserInfo() {
		return LocalStorageService.currentUser();
	}

	static isLogged() {
		return LocalStorageService.isLoggedIn();
	}
}

export default ApiController;