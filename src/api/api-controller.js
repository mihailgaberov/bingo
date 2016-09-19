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

		// Selectors
		/*this.signInLink = document.querySelector('.sign-in-link a');
		this.registerForm = document.querySelector('#registerForm');
		this.loginForm = document.querySelector('#loginForm');
		this.alertMsg = document.querySelector('#alertMsg');*/


		//this.isOnLoginPage = true;

		const viewCtrl = new ViewController();
	}

	/*attachListeners() {
		// Show/hide register/login form
		if (this.signInLink)
			this.signInLink.addEventListener('click', () => {
				this.toggleFormView();
			});

		// Registration form
		if (this.registerForm) {
			this.registerForm.addEventListener('submit', (e) => {
				e.preventDefault();
				this.register();
			});

		}

		// Login form
		if (this.loginForm) {
			this.loginForm.addEventListener('submit', (e) => {
				e.preventDefault();
				this.login();
			});
		}
	}*/

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
				/*document.querySelector('#gameWrapper').style.display = 'block';
				document.querySelector('#registerPage').style.display = 'none';*/
				ViewController.showGameScreen();
				LocalStorageService.saveToken(returnedValue.token);
				ViewController.showUserInfo();
			} else {
				console.log('Show error message for login failed.');
				//AlertMessagesService.showMsg(this.alertMsg);
				ViewController.showErrorMessage('Wrong login details.');
				//this.alertMsg.querySelector('#messageText').innerHTML = 'Wrong login details.';
				/*this.alertMsg.querySelector('.close').addEventListener('click', () => {
					AlertMessagesService.hideMsg(this.alertMsg);
				});*/
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
					//AlertMessagesService.showMsg(this.alertMsg);
					//this.alertMsg.querySelector('#messageText').innerHTML = 'User already existed.';
					ViewController.showErrorMessage('User already existed.');
				} else {
					LocalStorageService.saveToken(returnedValue.token);
					 /*document.querySelector('#gameWrapper').style.display = 'block';
					 document.querySelector('#registerPage').style.display = 'none';*/
					ViewController.showGameScreen();
				}
			} else {
				console.log('Show error message for registration failed.');
			}
		}).catch(function (err) {
			console.log('>>> Fetching error: ', err);
		});
	}

	/*toggleFormView() {
		AlertMessagesService.hideMsg(this.alertMsg);
		if (!this.isOnLoginPage) {
			this.registerForm.style.display = 'none';
			this.loginForm.style.display = 'block';
			this.signInLink.innerText = 'Don\'t have an account? Register here!';
			this.isOnLoginPage = true;
		} else {
			this.registerForm.style.display = 'block';
			this.loginForm.style.display = 'none';
			this.signInLink.innerText = 'Already have an account? Sign in here!';
			this.isOnLoginPage = false;
		}
	}*/

	static logout() {
		LocalStorageService.logout();

		ViewController.updateViewState();
	}

	/*static updateViewState() {
		// Check if the user is already logged in
		if (LocalStorageService.isLoggedIn()) {
			document.querySelector('#gameWrapper').style.display = 'block';
			document.querySelector('#registerPage').style.display = 'none';
		} else {
			document.querySelector('#gameWrapper').style.display = 'none';
			document.querySelector('#registerPage').style.display = 'block';
		}
	}*/

	static getUserInfo() {
		return LocalStorageService.currentUser();
	}

	/*static showUserInfo() {
		const elUserProfile = document.querySelector('#userProfile');

		if (elUserProfile) {
			const elName = elUserProfile.querySelector('h2');
			const elEmail = elUserProfile.querySelector('h3');
			const elBalance = elUserProfile.querySelector('h4 span');

			elName.innerHTML = ApiController.getUserInfo().name;
			elEmail.innerHTML = ApiController.getUserInfo().email;
			elBalance.innerHTML = ApiController.getUserInfo().balance;
		}
	}*/

	static isLogged() {
		return LocalStorageService.isLoggedIn();
	}
}

export default ApiController;