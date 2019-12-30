import { EventsConsts } from '../../../src/events/events-consts';

describe('Bingo Events Constants', () => {

	test('Should contain LOGOUT constant', () => {
		expect(EventsConsts.LOGOUT).to.be.equal('logout');
	});

	test('Should contain NEW_BALL_DRAWN constant', () => {
		expect(EventsConsts.NEW_BALL_DRAWN).to.be.equal('newBallDrawn');
	});

	test('Should contain START_GAME constant', () => {
		expect(EventsConsts.START_GAME).to.be.equal('startGame');
	});

	test('Should contain END_GAME constant', () => {
		expect(EventsConsts.END_GAME).to.be.equal('endGame');
	});

	test('Should contain BINGO constant', () => {
		expect(EventsConsts.BINGO).to.be.equal('bingo');
	});

	test('Should contain PRIZE_WON constant', () => {
		expect(EventsConsts.PRIZE_WON).to.be.equal('prizeWon');
	});

	test('Should contain FLYING_PRIZE_ANIMATION_ENDS constant', () => {
		expect(EventsConsts.FLYING_PRIZE_ANIMATION_ENDS).to.be.equal('flyingPrizeAnimationEnds');
	});

	test('Should contain ENOUGH_BALANCE constant', () => {
		expect(EventsConsts.ENOUGH_BALANCE).to.be.equal('enoughBalance');
	});

	test('Should contain NOT_ENOUGH_BALANCE constant', () => {
		expect(EventsConsts.NOT_ENOUGH_BALANCE).to.be.equal('notEnoughBalance');
	});
});
