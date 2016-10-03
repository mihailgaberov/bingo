/**
 * Created by Mihail on 10/2/2016.
 */
'use strict';

import assert from 'assert';
import Ball from '../../src/dauber/ball';
import { expect } from 'chai';
import jsdom  from 'mocha-jsdom';

describe('Ball module', () => {

	jsdom();
	const ball = new Ball(34);

	it('Should create a ball object', (done) => {
		expect(ball).not.to.be.undefined;
		done();
	});

	it('Should create a ball object with given number', (done) => {
		expect(ball.number).not.to.be.undefined;
		expect(ball.number).to.be.equal(34);
		done();
	});

	it('Should create a ball object with given color', (done) => {
		expect(ball.color).not.to.be.undefined;
		expect(ball.color).to.be.equal('radial-gradient(circle, #660099, #fff)');
		done();
	});

	it('Should be able to draw itself', (done) => {
		expect(ball.draw).not.to.be.undefined;
		const el = document.createElement('div');
		el.setAttribute('id', 'tube');
		ball.draw(el);
		expect(document.querySelector('#tube')).to.have.children;
		done();
	});
});