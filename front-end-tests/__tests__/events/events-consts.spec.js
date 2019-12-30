import { EventsConsts } from '../../../src/events/events-consts';

describe('Bingo Events Constants', () => {

	test('Should contain LOGOUT constant', () => {
		expect(EventsConsts.LOGOUT).toEqual('logout');
	});

	test('Should contain NEW_BALL_DRAWN constant', () => {
		expect(EventsConsts.NEW_BALL_DRAWN).toEqual('newBallDrawn');
	});

	test('Should contain START_GAME constant', () => {
		expect(EventsConsts.START_GAME).toEqual('startGame');
	});

	test('Should contain END_GAME constant', () => {
		expect(EventsConsts.END_GAME).toEqual('endGame');
	});

	test('Should contain BINGO constant', () => {
		expect(EventsConsts.BINGO).toEqual('bingo');
	});

	test('Should contain PRIZE_WON constant', () => {
		expect(EventsConsts.PRIZE_WON).toEqual('prizeWon');
	});

	test('Should contain FLYING_PRIZE_ANIMATION_ENDS constant', () => {
		expect(EventsConsts.FLYING_PRIZE_ANIMATION_ENDS).toEqual('flyingPrizeAnimationEnds');
	});

	test('Should contain ENOUGH_BALANCE constant', () => {
		expect(EventsConsts.ENOUGH_BALANCE).toEqual('enoughBalance');
	});

	test('Should contain NOT_ENOUGH_BALANCE constant', () => {
		expect(EventsConsts.NOT_ENOUGH_BALANCE).toEqual('notEnoughBalance');
	});
});
