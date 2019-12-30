/**
 * Created by Mihail on 10/14/2016.
 */
'use strict';

import Timer from '../../../src/utils/timer';
import { EventsConsts } from '../../../src/events/events-consts';
import { expect } from 'chai';

describe('Timer module', () => {
	test('Should create new Timer object', () => {
		const timer = new Timer(document.querySelector('#timerContainer'), 5, EventsConsts.START_GAME, true);
		expect(timer).not.to.be.undefined;
	});

	test('Should accept 3 parameters - seconds, eventName and isVisible', () => {
		const timer = new Timer(document.querySelector('#timerContainer'), 5, EventsConsts.START_GAME, true);
		expect(timer.hasOwnProperty('seconds')).to.be.truthy;
		expect(timer.hasOwnProperty('eventName')).to.be.truthy;
		expect(timer.hasOwnProperty('isVisible')).to.be.truthy;
	});

	test('Should accept 3 parameters types - number, string and boolean', () => {
		const timer = new Timer(document.querySelector('#timerContainer'), 5, EventsConsts.START_GAME, true);
		expect(timer.seconds).to.be.equal(5);
		expect(timer.eventName).to.have.string(EventsConsts.START_GAME);
		expect(timer.isVisible).to.be.true;
	});

	test('Should provide method for pulsating', () => {
		const timer = new Timer(document.querySelector('#timerContainer'), 5, EventsConsts.START_GAME, true);
		expect(timer.startCounting).not.to.be.undefined;
	});

	test('Should animate pulse for given time and the to be hidden', () => {
		const el = document.createElement('div');
		const timer = new Timer(el, 5, EventsConsts.START_GAME, true);
		timer.startCounting();
		setTimeout(() => {
			expect(timer.element.style.display).to.be.equal('none');
		}, (timer.seconds) * 1000);
	});

	test('Should provide method hiding the timer', () => {
		const timer = new Timer(document.querySelector('#timerContainer'), 5, EventsConsts.START_GAME, true);
		expect(timer.hide).not.to.be.undefined;
	});

	test('Should hide the Timer container whit the relevant method', () => {
		const el = document.createElement('div');
		const timer = new Timer(el, 5, EventsConsts.START_GAME, true);
		timer.hide();
		expect(timer.element.style.display).to.be.equal('none');
	});
});