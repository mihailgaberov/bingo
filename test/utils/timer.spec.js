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
		const timer = new Timer(document.querySelector('#timerContainer'), 5, EventsConsts.START_GAME, true);
		expect(timer).not.to.be.undefined;
	});

	it('Should accept 3 parameters - seconds, eventName and isVisible', () => {
		const timer = new Timer(document.querySelector('#timerContainer'), 5, EventsConsts.START_GAME, true);
		expect(timer.hasOwnProperty('seconds')).to.be.truthy;
		expect(timer.hasOwnProperty('eventName')).to.be.truthy;
		expect(timer.hasOwnProperty('isVisible')).to.be.truthy;
	});

	it('Should accept 3 parameters types - number, string and boolean', () => {
		const timer = new Timer(document.querySelector('#timerContainer'), 5, EventsConsts.START_GAME, true);
		expect(timer.seconds).to.be.equal(5);
		expect(timer.eventName).to.have.string(EventsConsts.START_GAME);
		expect(timer.isVisible).to.be.true;
	});

	it('Should provide method for pulsating', () => {
		const timer = new Timer(document.querySelector('#timerContainer'), 5, EventsConsts.START_GAME, true);
		expect(timer.pulsate).not.to.be.undefined;
	});

	it('Should animate pulse for given time and the to be hidden', () => {
		const el = document.createElement('div');
		const timer = new Timer(el, 5, EventsConsts.START_GAME, true);
		setTimeout(() => {
			expect(timer.element.style.display).to.be.equal('none');
		}, timer.seconds);
	});

	it('Should provide method hiding the timer', () => {
		const timer = new Timer(document.querySelector('#timerContainer'), 5, EventsConsts.START_GAME, true);
		expect(timer.hide).not.to.be.undefined;
	});

	it('Should hide the Timer container whit the relevant method', () => {
		const el = document.createElement('div');
		const timer = new Timer(el, 5, EventsConsts.START_GAME, true);
		timer.hide();
		expect(timer.element.style.display).to.be.equal('none');
	});
});