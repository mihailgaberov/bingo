/**
 * Created by Mihail on 10/2/2016.
 */
'use strict';

import Ball from '../../../src/dauber/ball';
import PubSub from '../../../src/events/pubsub-service';
import { expect } from 'chai';

describe('Ball module', () => {
	test('Should create a ball object', (done) => {
		const pb = new PubSub();
		const ball = new Ball(34, pb, 'original');
		expect(ball).not.to.be.undefined;
		done();
	});

	test('Should create a ball object with given number', (done) => {
		const pb = new PubSub();
		const ball = new Ball(34, pb, 'original');
		expect(ball.elNumber.innerText).not.to.be.undefined;
		expect(ball.elNumber.innerText).to.be.equal(34);
		done();
	});

	test('Should create a ball object with given css class', (done) => {
		const pb = new PubSub();
		const ball = new Ball(34, pb, { name: 'original' });
		expect(ball.elBall.className).to.be.equal('original_ballN');
		done();
	});

	test('Should be able to draw itself', (done) => {
		const pb = new PubSub();
		const ball = new Ball(34, pb, 'original');
		expect(ball.draw).not.to.be.undefined;
		const el = document.createElement('div');
		el.setAttribute('id', 'tube');
		ball.draw(el);
		expect(document.querySelector('#tube')).to.have.children;
		done();
	});

	test('Should have methods moveVerticalHorizontal and animate', (done) => {
		const pb = new PubSub();
		const ball = new Ball(34, pb, 'original');
		expect(ball.move).not.to.be.undefined;
		expect(ball.animate).not.to.be.undefined;
		done();
	});
});