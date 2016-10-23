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
});