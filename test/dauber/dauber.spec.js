/**
 * Created by Mihail on 10/2/2016.
 */
'use strict';

import assert from 'assert';
import { Utils } from '../../src/utils/utils';
import Dauber from '../../src/dauber/dauber';
import { expect } from 'chai';
import jsdom  from 'mocha-jsdom';

describe('Dauber module', () => {

	jsdom();

	let conf = {
		"gameConf": {
			"id": "1",
			"name": "American Bingo",
			"numbers": [
				1, 2, 3, 4, 5,
				6, 7, 8, 9, 10,
				11, 12, 13, 14, 15,
				16, 17, 18, 19, 20,
				21, 22, 23, 24, 25,
				26, 27, 28, 29, 30,
				31, 32, 33, 34, 35,
				36, 37, 38, 39, 40,
				41, 42, 43, 44, 45,
				46, 47, 48, 49, 50,
				51, 52, 53, 54, 55,
				56, 57, 58, 59, 60,
				61, 62, 63, 64, 65,
				66, 67, 68, 69, 70,
				71, 72, 73, 74, 75
			]
		}
	};

	it('Should create a dauber module', (done) => {
		const selector = document.createElement('section');
		const dauber = new Dauber(conf, selector);
		expect(dauber).to.not.be.undefined;
		done();
	});

	it('Should be able to start the drawing of numbers/balls', (done) => {
		const selector = document.createElement('section');
		const dauber = new Dauber(conf, selector);
		expect(dauber.startDrawing).not.to.be.undefined;
		done();
	});

	it('Should be able to stop the drawing of numbers/balls', (done) => {
		const selector = document.createElement('section');
		const dauber = new Dauber(conf, selector);
		expect(dauber.stopDrawing).not.to.be.undefined;
		done();
	});

	it('Should produce each number from the range only once', (done) => {
		const selector = document.createElement('section');
		const dauber = new Dauber(conf, selector);
		expect(dauber.drawNewNumber).not.to.be.undefined;
		let arrDrawnNumbers = [];

		for (let i = 0, l = conf.gameConf.numbers.length; i < l; ++i) {
			let num = dauber.drawNewNumber();
			if (num !== undefined)
				arrDrawnNumbers.push(num);
		}

		const arrRes = Utils.eliminateDuplicates(arrDrawnNumbers);
		expect(arrDrawnNumbers.length).to.be.equal(arrRes.length);
		done();
	});

	it('Should be able to start drawing a new ball on each given time interval', (done) => {
		const elChild = document.createElement('div');
		document.body.appendChild(elChild);
		const dauber = new Dauber(conf, elChild);
		const intervalInMs = 2000;
		dauber.startDrawing(intervalInMs);
		setTimeout(() => {
			dauber.stopDrawing();
		}, 6000);

		expect(dauber.drawBall).to.be.calledTwice;
		done();
	});

	it('Should be able to move the balls when 5 are visible and hide the first one', (done) => {
		const selector = document.createElement('div');
		document.body.appendChild(selector);

		const dauber = new Dauber(conf, selector);
		expect(dauber.arrVisibleBalls).not.to.be.undefined;
		expect(dauber.arrVisibleBalls).to.be.array;

		const divEl = document.createElement('div');
		dauber.arrVisibleBalls = [
			{ elBall: divEl },
			{ elBall: divEl },
			{ elBall: divEl },
			{ elBall: divEl },
			{ elBall: divEl }
		];
		dauber.animateVisibleBalls();
		expect(dauber.arrVisibleBalls.length).to.be.eql(4);
		expect(dauber.arrVisibleBalls[0].elBall.style.display).to.be.equal('none');
		done();
	});
});