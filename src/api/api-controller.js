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

		let registerUrl = "http://localhost:8888/bingo-api/register";
		let loginUrl = "http://localhost:8888/bingo-api/login";

		let loginForm = document.querySelector('#loginForm');
		let registerForm = document.querySelector('#registerForm');
		let signInLink = document.querySelector('.sign-in-link a');
		let isOnLoginPage = false;

		// Show/hide register/login form
		if (signInLink)
			signInLink.addEventListener('click', () => {
			if (!isOnLoginPage) {
				registerForm.style.display = 'none';
				loginForm.style.display = 'block';
				signInLink.innerText = 'Don\'t have an account? Register here!';
				isOnLoginPage = true;
			} else {
				registerForm.style.display = 'block';
				loginForm.style.display = 'none';
				signInLink.innerText = 'Already have an account? Sign in here!';
				isOnLoginPage = false;
			}
		});

		if (registerForm)
			registerForm.addEventListener('submit', (e) => {
			e.preventDefault();

			let elName = document.querySelector('#registerName');
			let elEmail = document.querySelector('#regEmail');
			let elPass = document.querySelector('#registerPassword');

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
				 console.log('Show success message');
					LocalStorageService.saveToken(returnedValue.token);
				 } else {
				    console.log('Show error message for registration failed.');
				 }
			}).catch(function(err) {
				console.log('>>> Fetching error: ', err);
			});
		});

		if (loginForm)
			loginForm.addEventListener('submit', (e) => {
			e.preventDefault();

			let elEmail = document.querySelector('#email');
			let elPass = document.querySelector('#password');

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
				if (returnedValue) {
					document.querySelector('#gameWrapper').style.display = 'block';
					document.querySelector('#registerPage').style.display = 'none';
					LocalStorageService.saveToken(returnedValue.token);
				} else {
					console.log('Show error message for login failed.');
				}
			}).catch(function(err) {
				console.log('>>> Fetching error: ', err);
			});
		});
	}
}

export default ApiController;