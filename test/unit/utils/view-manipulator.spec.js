/**
 * Created by Mihail on 10/23/2016.
 */

'use strict';

import ViewManipulator from '../../../src/utils/view-manipulator';
import PubSubService from '../../../src/events/pubsub-service';
import { expect } from 'chai';
import jsdom  from 'mocha-jsdom';

describe('ViewManipulator module', () => {
	// Skips checking of window at startup. When false, mocha-jsdom will throw an error if window already exists. Defaults to false.
	jsdom.skipWindowCheck = true;
	jsdom();

	it('Should select the necessary dom elements', (done) => {
		const pubsub = new PubSubService();
		const viewMan = new ViewManipulator(pubsub);
		expect(viewMan.signInLink).not.to.be.undefined;
		expect(viewMan.registerForm).not.to.be.undefined;
		expect(viewMan.loginForm).not.to.be.undefined;
		expect(viewMan.marketPlace).not.to.be.undefined;
		expect(viewMan.btnCloseAlertMsg).not.to.be.undefined;
		expect(viewMan.isOnLoginPage).not.to.be.undefined;
		expect(viewMan.isOnLoginPage).not.to.be.falsy;
		done();
	});

	it('Should attach the necessary dom events listeners', (done) => {
		const pubsub = new PubSubService();
		const viewMan = new ViewManipulator(pubsub);
		expect(viewMan.attachViewListeners).to.be.calledOnce;
		done();
	});

	it('Should be subscribed to the LOGOUT pubsub event', (done) => {
		const pubsub = new PubSubService();
		const viewMan = new ViewManipulator(pubsub);
		expect(pubsub.subscribe).to.be.calledOnce;
		done();
	});

	it('Should provide a method for manipulating alert messages', (done) => {
		const elAlertMsg = document.createElement('div');
		const elMessageText = document.createElement('div');
		elMessageText.setAttribute('id', 'messageText');
		elAlertMsg.appendChild(elMessageText);
		ViewManipulator.toggleErrorMessageView(elAlertMsg, 'test text', true);

		expect(elAlertMsg.style.display).to.be.equal('block');
		expect(elMessageText.innerText).to.be.equal('test text');

		ViewManipulator.toggleErrorMessageView(elAlertMsg, 'test text', false);

		expect(elAlertMsg.style.display).to.be.equal('none');
		done();
	});

	it('Should provide a method for showing/hiding a given element', (done) => {
		 const el = document.createElement('div');
		 el.setAttribute('id', 'dauber');
		 document.body.appendChild(el);
		 ViewManipulator.toggleVisibility(el, false);
		 expect(el.style.display).to.be.equal('none');
		 done();
	 });

	it('Should provide a method for updating the view/screen state', (done) => {
		const elGameWrapper = document.createElement('div');
		const elRegisterPage = document.createElement('div');
		let isLoggedIn = false;

		ViewManipulator.updateViewState(elGameWrapper, elRegisterPage, isLoggedIn);
		expect(elGameWrapper.style.display).to.be.equal('none');
		expect(elRegisterPage.style.display).to.be.equal('block');

		isLoggedIn = true;

		ViewManipulator.updateViewState(elGameWrapper, elRegisterPage, isLoggedIn);
		expect(elGameWrapper.style.display).to.be.equal('block');
		expect(elRegisterPage.style.display).to.be.equal('none');
		done();
	});
});