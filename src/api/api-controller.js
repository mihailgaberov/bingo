/**
 * Created by Mihail on 9/17/2016.
 */

'use strict';

import LocalStorageService from '../local-storage/local-storage-service';

class ApiController {
	constructor() {
		// Check if the user is already logged in
		if (LocalStorageService.isLoggedIn()) {
			document.querySelector('#gameWrapper').style.display = 'block';
			document.querySelector('#registerPage').style.display = 'none';
		}

		// Routes
		this.registerUrl = "http://localhost:8888/bingo-api/register";
		this.loginUrl = "http://localhost:8888/bingo-api/login";

		// Selectors
		this.signInLink = document.querySelector('.sign-in-link a');
		this.registerForm = document.querySelector('#registerForm');
		this.loginForm = document.querySelector('#loginForm');

		this.isOnLoginPage = false;

		this.attachListeners();
	}

	attachListeners() {
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
	}

	login() {
		let elEmail = document.querySelector('#email');
		let elPass = document.querySelector('#password');

		if (elEmail === null || elEmail.value === undefined ||
			elPass === null || elPass.value === undefined) {
			console.log('Not valid user data.');
			return;
		}

		fetch(this.loginUrl, {
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
			if (returnedValue) {
				document.querySelector('#gameWrapper').style.display = 'block';
				document.querySelector('#registerPage').style.display = 'none';
				LocalStorageService.saveToken(returnedValue.token);
			} else {
				console.log('Show error message for login failed.');
			}
		}).catch(function (err) {
			console.log('>>> Fetching error: ', err);
		});
	}

	register() {
		let elName = document.querySelector('#registerName');
		let elEmail = document.querySelector('#regEmail');
		let elPass = document.querySelector('#registerPassword');

		if (elName === null || elName.value === undefined ||
			elEmail === null || elEmail.value === undefined ||
			elPass === null || elPass.value === undefined) {
			console.log('Not valid user data.');
			return;
		}

		fetch(this.registerUrl, {
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
					console.log('>>> Show error message for existed user!');
				} else {
					LocalStorageService.saveToken(returnedValue.token);
					 document.querySelector('#gameWrapper').style.display = 'block';
					 document.querySelector('#registerPage').style.display = 'none';
				}
			} else {
				console.log('Show error message for registration failed.');
			}
		}).catch(function (err) {
			console.log('>>> Fetching error: ', err);
		});
	}

	toggleFormView() {
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
	}

	static logout() {
		LocalStorageService.logout();

		if (!LocalStorageService.isLoggedIn()) {
			document.querySelector('#gameWrapper').style.display = 'none';
			document.querySelector('#registerPage').style.display = 'block';
		}
	}
}

export default ApiController;