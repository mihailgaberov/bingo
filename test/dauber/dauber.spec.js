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

	let dauber = new Dauber(conf);

	it ('Should create a dauber module', (done) => {
		expect(dauber).to.not.be.undefined;
		done();
	});

	it ('Should be able to start the drawing of numbers/balls', (done) => {
		expect(dauber.startDrawing).not.to.be.undefined;
		done();
	});

	it ('Should be able to stop the drawing of numbers/balls', (done) => {
		expect(dauber.stopDrawing).not.to.be.undefined;
		done();
	});

	it ('Should produce each number from the range only once', (done) => {
		expect(dauber.drawNewNumber).not.to.be.undefined;
		let arrDrawnNumbers = [];

		for (let i = 0, l = conf.gameConf.numbers.length; i < l; ++i) {
			let num =  dauber.drawNewNumber();
			if (num !== undefined)
				arrDrawnNumbers.push(num);
		}

		const arrRes = Utils.eliminateDuplicates(arrDrawnNumbers);
		expect(arrDrawnNumbers.length).to.be.equal(arrRes.length);
;		done();
	});

	/*
	 it ('Should be able to produce a new number from the range on given time interval', (done) => {
	 expect(dauber.drawNewNumber).not.to.be.undefined;

	 /!*let intervalInMs = 2000;
	 dauber.drawNewNumber(intervalInMs);*!/

	 done();
	 });*/
});