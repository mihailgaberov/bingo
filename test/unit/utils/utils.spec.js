/**
 * Created by Mihail on 10/2/2016.
 */
'use strict';

import { Utils } from '../../../src/utils/utils';
import { expect } from 'chai';

describe('Utils service', () => {
	it('Should provide a method for eliminating duplicates in array', (done) => {
		const arr = [1,2,3,4,5,5];
		const arrRes = Utils.eliminateDuplicates(arr);
		expect(arrRes.length).to.be.equal(5);
		done();
	});

	it('Should provide a method for defining the ball css class', (done) => {
		const num = 15;
		const resColor = Utils.getCssClassByNumber(num);
		expect(resColor).to.be.equal('ballB');
		done();
	});

	it('Should provide a method for counting a given element in array', (done) => {
		const arr = [1, 2, 3, 1];
		const len = Utils.countInArray(arr, 1);
		expect(len).to.be.equal(2);
		done();
	});
});