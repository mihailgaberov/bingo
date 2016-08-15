/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';
import assert from 'assert';
import App from '../src/app';
import { expect } from 'chai';

describe('Bingo App', () => {

	var appBingo = new App();

	it('Should set the title of the application', () => {
		expect(appBingo.title).to.equal('Bingo game');
	});

	it('Should start the application', () => {
		var action = appBingo.doIt();
		expect(action).to.equal('Bingo game: start');
	});
});