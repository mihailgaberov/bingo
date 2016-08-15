/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';
import assert from 'assert';
import App from '../src/app';
import { expect } from 'chai';

describe('Bingo App', () => {

	let appBingo = new App();

	it('Should set the title of the application', () => {
		expect(appBingo.title).to.equal('Bingo game');
	});

	it('Should initialize the necessary services to start the app', () => {
		expect(appBingo.cardGenerator).not.to.be.undefined;
	});
});