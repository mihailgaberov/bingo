/**
 * Created by Mihail on 10/2/2016.
 */
'use strict';

import assert from 'assert';
import { Utils } from '../../src/utils/utils';
import { expect } from 'chai';

describe('Utils service', () => {

	it ('Should provide a method for eliminating duplicates in array', (done) => {
		const arr = [1,2,3,4,5,5];
		const arrRes = Utils.eliminateDuplicates(arr);
		expect(arrRes.length).to.be.equal(5);
		done();
	});

	it ('Should provide a method for defining the ball color according to its number', (done) => {
		const num = 15;
		const resColor = Utils.getColorByNumber(num);
		expect(resColor).to.be.equal('radial-gradient(circle, #990000, #fff)');
		done();
	});

	it ('Should provide a method for defining the ball border color according to its number', (done) => {
		const num = 16;
		const resColor = Utils.getBorderColorByNumber(num);
		expect(resColor).to.be.equal('#006666');
		done();
	});
});