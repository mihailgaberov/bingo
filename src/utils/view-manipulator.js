/**
 * Created by Mihail on 9/20/2016.
 */

"use strict";

import { EventsConsts } from '../events/events-consts';
import ApiController from '../api/api-controller';
import AlertMessagesService from '../messages/alert-messages-service';
import LocalStorageService from '../local-storage/local-storage-service';

class ViewManipulator {
	constructor(pubsub) {
		this.signInLink = document.querySelector('.sign-in-link a');
		this.registerForm = document.querySelector('#registerForm');
		this.loginForm = document.querySelector('#loginForm');
		this.marketPlace = document.querySelector('#marketPlace');

		this.isOnLoginPage = true;

		this.attachViewListeners();

		pubsub.subscribe(EventsConsts.LOGOUT, (eventData) => {
			if (eventData.isLogout) {
				ViewManipulator.updateViewState();
			}
		});

	}

	attachViewListeners() {
		if (this.signInLink)
			this.signInLink.addEventListener('click', () => {
				this.toggleFormView(this.isOnLoginPage);
			});

		// Registration form
		if (this.registerForm) {
			this.registerForm.addEventListener('submit', (e) => {
				e.preventDefault();
				ApiController.register();
			});

		}

		// Login form
		if (this.loginForm) {
			this.loginForm.addEventListener('submit', (e) => {
				e.preventDefault();
				ApiController.login();
			});
		}

		// Market cards
		if (this.marketPlace) {
			this.marketPlace.addEventListener('click', (e) => {
				const parent = e.target.parentNode.parentNode;
				const strSelectedClassName = 'selected';
				const strDesignatedClassName = 'jsMarketCardContainer';

				// Remove 'selected' class from all others elements
				const arrAllCards = Array.from(document.querySelectorAll('.' + strDesignatedClassName));
				let len = arrAllCards.length - 1;
				while (len >= 0) {
					if (typeof arrAllCards[len] !== 'undefined') {
						arrAllCards[len].classList.remove(strSelectedClassName);
					}
					len--;
				}

				if (parent.classList.contains(strDesignatedClassName)) {
					parent.classList.add(strSelectedClassName);
				} else {
					parent.parentNode.classList.add(strSelectedClassName);
				}
			});
		}
	}

	toggleFormView(isOnLoginPage) {
		AlertMessagesService.hideMsg(this.alertMsg);
		if (!isOnLoginPage) {
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

	static toggleErrorMessageView(msg, isShow) {
		const alertMsg = document.querySelector('#alertMsg');
		console.log(msg);
		alertMsg.querySelector('#messageText').innerText = msg;
		if (!isShow) {
			AlertMessagesService.hideMsg(alertMsg);
		} else {
			AlertMessagesService.showMsg(alertMsg);
		}
	}

	static showGameScreen() {
		document.querySelector('#gameWrapper').style.display = 'block';
		document.querySelector('#registerPage').style.display = 'none';
	}

	static showLoginScreen() {
		document.querySelector('#gameWrapper').style.display = 'none';
		document.querySelector('#registerPage').style.display = 'block';
	}

	static updateViewState() {
		if (LocalStorageService.isLoggedIn()) {
			ViewManipulator.showGameScreen();
		} else {
			ViewManipulator.showLoginScreen();
		}
	}

	static showUserInfo() {
		const elUserProfile = document.querySelector('#userProfile');

		if (elUserProfile) {
			const elName = elUserProfile.querySelector('h2');
			const elEmail = elUserProfile.querySelector('div a');
			elEmail.setAttribute('href', 'mailto:' + ApiController.getUserInfo().email);
			const elBalance = elUserProfile.querySelector('h4 span');

			elName.innerHTML = ApiController.getUserInfo().name;
			elEmail.innerHTML = ApiController.getUserInfo().email;
			elBalance.innerHTML = ApiController.getUserInfo().balance;
		}
	}
}

export default ViewManipulator;
