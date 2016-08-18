/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';
import App from '../src/app';
import { expect, assert } from 'chai';

describe('Bingo App', () => {

	let appBingo = new App();

	it('Should set the title of the application', () => {
		expect(appBingo.title).to.equal('Bingo game');
	});

	it('Should initialize the necessary services to start the app', () => {
		expect(appBingo.cardGenerator).not.to.be.undefined;
	});

	it('Should load the configuration settings from the backend', () => {
		let configs = appBingo.loadConfigs();
		expect(configs).not.to.be.undefined;
	});

	it('Should have the proper gameConf settings', () => {
		let configs = appBingo.loadConfigs();
		assert.isNotNull(configs, 'Configurations are not null.');
		assert.isObject(configs, 'Configuration settings are object.');
		expect(configs).to.have.property('gameConf');
	});
});