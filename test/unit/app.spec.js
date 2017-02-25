/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';
import App from '../../src/app';
import { expect, assert } from 'chai';
// import sinon from 'sinon';

describe('Bingo App', () => {

	let appBingo = new App();

	it('Should have a url for loading the configs', () => {
		expect(appBingo.confUrl).to.not.be.undefined;
		expect(appBingo.confUrl).to.be.a('string');
	});

  it('Should initialize the game via Game Initializator', () => {
    setTimeout(() => {
      expect(appBingo.initializator).not.to.be.null;
    });
  });
});