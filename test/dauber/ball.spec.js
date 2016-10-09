/**
 * Created by Mihail on 10/2/2016.
 */
'use strict';

import assert from 'assert';
import Ball from '../../src/dauber/ball';
import PubSub from '../../src/events/pubsub-service';
import { expect } from 'chai';
import jsdom  from 'mocha-jsdom';

describe('Ball module', () => {

	jsdom();

	it('Should create a ball object', (done) => {
		const pb = new PubSub();
		const ball = new Ball(34, pb);
		expect(ball).not.to.be.undefined;
		done();
	});

	it('Should create a ball object with given number', (done) => {
		const pb = new PubSub();
		const ball = new Ball(34, pb);
		expect(ball.elNumber.innerText).not.to.be.undefined;
		expect(ball.elNumber.innerText).to.be.equal(34);
		done();
	});

	it('Should create a ball object with given css class', (done) => {
		const pb = new PubSub();
		const ball = new Ball(34, pb);
		expect(ball.elBall.className).to.be.equal('ballN');
		done();
	});

	it('Should be able to draw itself', (done) => {
		const pb = new PubSub();
		const ball = new Ball(34, pb);
		expect(ball.draw).not.to.be.undefined;
		const el = document.createElement('div');
		el.setAttribute('id', 'tube');
		ball.draw(el);
		expect(document.querySelector('#tube')).to.have.children;
		done();
	});

	it('Should have methods move, animate, bounce and quad', (done) => {
		const pb = new PubSub();
		const ball = new Ball(34, pb);
		expect(ball.move).not.to.be.undefined;
		expect(ball.animate).not.to.be.undefined;
		expect(Ball.bounce).not.to.be.undefined;
		expect(Ball.quad).not.to.be.undefined;
		done();
	});
});