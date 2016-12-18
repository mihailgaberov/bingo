/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';
import { EventsConsts } from '../../src/events/events-consts';
import { expect, assert } from 'chai';

describe('Bingo Events Constants', () => {

	it('Should contain LOGOUT constant', () => {
		expect(EventsConsts.LOGOUT).to.be.equal('logout');
	});

	it('Should contain NEW_BALL_DRAWN constant', () => {
		expect(EventsConsts.NEW_BALL_DRAWN).to.be.equal('newBallDrawn');
	});

	it('Should contain START_GAME constant', () => {
		expect(EventsConsts.START_GAME).to.be.equal('startGame');
	});

	it('Should contain END_GAME constant', () => {
		expect(EventsConsts.END_GAME).to.be.equal('endGame');
	});

	it('Should contain BINGO constant', () => {
		expect(EventsConsts.BINGO).to.be.equal('bingo');
	});

	it('Should contain PRIZE_WON constant', () => {
		expect(EventsConsts.PRIZE_WON).to.be.equal('prizeWon');
	});

	it('Should contain FLYING_PRIZE_ANIMATION_ENDS constant', () => {
		expect(EventsConsts.FLYING_PRIZE_ANIMATION_ENDS).to.be.equal('flyingPrizeAnimationEnds');
	});

	it('Should contain ENOUGH_BALANCE constant', () => {
		expect(EventsConsts.ENOUGH_BALANCE).to.be.equal('enoughBalance');
	});

	it('Should contain NOT_ENOUGH_BALANCE constant', () => {
		expect(EventsConsts.NOT_ENOUGH_BALANCE).to.be.equal('notEnoughBalance');
	});
});