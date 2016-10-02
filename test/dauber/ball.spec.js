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


	it('Should create a ball object', (done) => {
		const ball = new Ball(4, 'blue');
		expect(ball).not.to.be.undefined;
		done();
	});

	it('Should create a ball object with given number', (done) => {
		const ball = new Ball(4, 'blue');
		expect(ball.number).not.to.be.undefined;
		expect(ball.number).to.be.equal(4);
		done();
	});

	it('Should create a ball object with given color', (done) => {
		const ball = new Ball(4, 'blue');
		expect(ball.color).not.to.be.undefined;
		expect(ball.color).to.be.equal('blue');
		done();
	});

});