/**
 * Created by Mihail on 10/14/2016.
 */
'use strict';

import assert from 'assert';
import Timer from '../../src/utils/timer';
import { EventsConsts } from '../../src/events/events-consts';
import { expect } from 'chai';
import jsdom  from 'mocha-jsdom';

describe('Timer module', () => {

	jsdom();

	it ('Should create new Timer object', () => {
		const timer = new Timer(5, EventsConsts.START_GAME, true);
		expect(timer).not.to.be.undefined;
	});

	it('Should accept 3 parameters - seconds, eventName and isVisible', () => {
		const timer = new Timer(5, EventsConsts.START_GAME, true);
		expect(timer.hasOwnProperty('seconds')).to.be.truthy;
		expect(timer.hasOwnProperty('eventName')).to.be.truthy;
		expect(timer.hasOwnProperty('isVisible')).to.be.truthy;
	});

	it('Should accept 3 parameters types - number, string and boolean', () => {
		const timer = new Timer(5, EventsConsts.START_GAME, true);
		expect(timer.seconds).to.be.equal(5);
		expect(timer.eventName).to.have.string(EventsConsts.START_GAME);
		expect(timer.isVisible).to.be.true;
	});

	it('Should provide method for pulsating', () => {
		const timer = new Timer(5, EventsConsts.START_GAME, true);
		expect(timer.pulsate).not.to.be.undefined;
	});
});
