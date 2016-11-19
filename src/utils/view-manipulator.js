/**
 * Created by Mihail on 9/20/2016.
 */

"use strict";

import { EventsConsts } from '../events/events-consts';
import ApiController from '../api/api-controller';
import LocalStorageService from '../local-storage/local-storage-service';
import Bangup from '../utils/bangup';

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
				ViewManipulator.updateViewState(undefined, undefined, LocalStorageService.isLoggedIn());
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

	static toggleErrorMessageView(elAlertMsg, msg, isShow) {
		elAlertMsg.querySelector('#messageText').innerText = msg;
		ViewManipulator.toggleVisibility(elAlertMsg, isShow);
	}

	static updateViewState(elGameWrapper = document.querySelector('#gameWrapper'), elRegisterPage = document.querySelector('#registerPage'), isLoggedIn = false) {
		ViewManipulator.toggleVisibility(elGameWrapper, isLoggedIn);
		ViewManipulator.toggleVisibility(elRegisterPage, !isLoggedIn);
	}

	static showUserInfo(elUserProfile = document.querySelector('#userProfile')) {
		if (elUserProfile) {
			const elName = elUserProfile.querySelector('h2');
			const elEmail = elUserProfile.querySelector('div a');
			const objUserInfo = ApiController.getProfileInfo();
			elEmail.setAttribute('href', 'mailto:' + objUserInfo.email);
			elName.innerHTML = objUserInfo.name;
			elEmail.innerHTML = objUserInfo.email;

			const promiseBalance = ApiController.getPlayerBalancePromise();
			promiseBalance.then((val) => {
				ViewManipulator.updateBalance(0, val);
			});
		}
	}

	static updateBalance(fromSum, toSum) {
		const elBalance = document.querySelector('#userProfile').querySelector('h4 span');
		const balanceBangup = new Bangup(elBalance, fromSum, toSum);
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