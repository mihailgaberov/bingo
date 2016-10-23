/**
 * Created by Mihail on 9/20/2016.
 */

"use strict";

import { EventsConsts } from '../events/events-consts';
import ApiController from '../api/api-controller';
import LocalStorageService from '../local-storage/local-storage-service';

class ViewManipulator {
	constructor(pubsub) {
		this.signInLink = document.querySelector('.sign-in-link a');
		this.registerForm = document.querySelector('#registerForm');
		this.loginForm = document.querySelector('#loginForm');
		this.marketPlace = document.querySelector('#marketPlace');
		this.btnCloseAlertMsg = document.querySelector('#btnCloseAlertMsg');
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

		// We don't use jQuery => cannot use the Bootstrap implementation of closing the
		// alert messages => implement it custom here
		if (this.btnCloseAlertMsg) {
			this.btnCloseAlertMsg.addEventListener('click', (e) => {
				ViewManipulator.toggleVisibility(e.target.parentNode.parentNode, false);
			});
		}

		// Market cards
		if (this.marketPlace) {
			this.marketPlace.addEventListener('click', (e) => {
				ViewManipulator.toggleMarketCardSelectedState(e);
			});
		}
	}

	toggleFormView(isOnLoginPage) {
		ViewManipulator.toggleVisibility(this.loginForm, !isOnLoginPage);
		ViewManipulator.toggleVisibility(this.registerForm, isOnLoginPage);
		if (!isOnLoginPage) {
			this.signInLink.innerText = 'Don\'t have an account? Register here!';
			this.isOnLoginPage = true;
		} else {
			this.signInLink.innerText = 'Already have an account? Sign in here!';
			this.isOnLoginPage = false;
		}
	}

	static toggleErrorMessageView(msg, isShow) {
		const alertMsg = document.querySelector('#alertMsg');
		alertMsg.querySelector('#messageText').innerText = msg;
		ViewManipulator.toggleVisibility(alertMsg, isShow);
	}

	static updateViewState() {
		ViewManipulator.toggleVisibility(document.querySelector('#gameWrapper'), LocalStorageService.isLoggedIn());
		ViewManipulator.toggleVisibility(document.querySelector('#registerPage'), !LocalStorageService.isLoggedIn());
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

	static toggleMarketCardSelectedState(event) {
		const parent = event.target.parentNode.parentNode;
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

	}

	static toggleVisibility(element, isVisible) {
		element.style.display = (isVisible ? 'block' : 'none');
	}
}

export default ViewManipulator;