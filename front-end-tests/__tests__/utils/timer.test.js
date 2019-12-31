import Timer from '../../../src/utils/timer';
import { EventsConsts } from '../../../src/events/events-consts';

describe('Timer module', () => {
	test('Should create new Timer object', () => {
		const timer = new Timer(document.querySelector('#timerContainer'), 5, EventsConsts.START_GAME, true);
		expect(timer).toBeDefined();
	});

	test('Should accept 3 parameters - seconds, eventName and isVisible', () => {
		const timer = new Timer(document.querySelector('#timerContainer'), 5, EventsConsts.START_GAME, true);
		expect(timer.hasOwnProperty('seconds')).toBeTruthy();
		expect(timer.hasOwnProperty('eventName')).toBeTruthy();
		expect(timer.hasOwnProperty('isVisible')).toBeTruthy();
	});

	test('Should accept 3 parameters types - number, string and boolean', () => {
		const timer = new Timer(document.querySelector('#timerContainer'), 5, EventsConsts.START_GAME, true);
		expect(timer.seconds).toEqual(5);
		expect(timer.eventName).toContain(EventsConsts.START_GAME);
		expect(timer.isVisible).toBeTruthy();
	});

	test('Should provide method for pulsating', () => {
		const timer = new Timer(document.querySelector('#timerContainer'), 5, EventsConsts.START_GAME, true);
		expect(timer.startCounting).toBeDefined();
	});

	test('Should animate pulse for given time and the to be hidden', () => {
		const el = document.createElement('div');
		const timer = new Timer(el, 5, EventsConsts.START_GAME, true);
		timer.startCounting();
		setTimeout(() => {
			expect(timer.element.style.display).toEqual('none');
		}, (timer.seconds) * 1000);
	});

	test('Should provide method hiding the timer', () => {
		const timer = new Timer(document.querySelector('#timerContainer'), 5, EventsConsts.START_GAME, true);
		expect(timer.hide).toBeDefined();
	});

	test('Should hide the Timer container whit the relevant method', () => {
		const el = document.createElement('div');
		const timer = new Timer(el, 5, EventsConsts.START_GAME, true);
		timer.hide();
		expect(timer.element.style.display).toEqual('none');
	});
});
