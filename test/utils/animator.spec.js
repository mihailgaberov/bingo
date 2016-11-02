/**
 * Created by Mihail on 10/29/2016.
 */

'use strict';

import Animator from '../../src/utils/animator';
import assert from 'assert';
import { expect } from 'chai';
import jsdom  from 'mocha-jsdom';

describe('Animator module', () => {

	jsdom();

	it('Should provide linear method used in animations', () => {
		expect(Animator.linear).not.to.be.undefined;
	});

	it('Should provide quadratic method used in animations', () => {
		expect(Animator.quad).not.to.be.undefined;
	});

	it('Should provide bounce method used in animations', () => {
		expect(Animator.bounce).not.to.be.undefined;
	});

	it('Should provide animate method used in animations', () => {
		expect(Animator.animate).not.to.be.undefined;
	});

	it('Should provide move method used in animations', () => {
		expect(Animator.move).not.to.be.undefined;
	});

	it('Should animate moving an element from its current to a given coordinates', (done) => {
		const el = document.createElement('div');
		el.style.top = '5px';
		el.style.left = '5px';

		Animator.move(el, 10, 10, Animator.linear, 200, 'px');

		setTimeout(() => {
			expect(el.style.top).to.be.equal('10px');
			expect(el.style.left).to.be.equal('10px');
		}, 500);

		expect(Animator.animate).to.have.been.calledTwice;
		done();
	});

	it('Should animate rotating of a given element', () => {
		const el = document.createElement('div');
		el.style.transform = 0;

		Animator.rotateElement(el, 30, Animator.linear, 300);
		setTimeout(() => {
			expect(el.style.transform).to.be.equal('rotate(30deg)');
		}, 500);
	});
});