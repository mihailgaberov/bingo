/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';
import App from '../../src/app';
import { expect, assert } from 'chai';
import sinon from 'sinon';

describe('Bingo App', () => {

	let appBingo = new App();

	it('Should have a url for loading the configs', () => {
		expect(appBingo.confUrl).to.not.be.undefined;
		expect(appBingo.confUrl).to.be.a('string');
	});

	it('Should set the title of the application', () => {
		expect(appBingo.title).to.be.a('string');
		setTimeout(() => {
			expect(appBingo.title).to.equal('Welcome To Bingo Bigul');
		}, 200);
	});

	/*it("Should start game initialization when get the configs", function () {
		let callback = sinon.spy();
		let proxy = appBingo.init({});

		proxy();

		assert(callback.called);
	});*/

	it('Should initialize the CardGenerator to init the app', () => {
		expect(appBingo.hasOwnProperty(appBingo.cardGen)).not.to.be.undefined;
	});

	it('Should initialize the CardDrawer to init the app', () => {
		expect(appBingo.hasOwnProperty(appBingo.CardDrawer)).not.to.be.undefined;
	});
});