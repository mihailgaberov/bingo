/**
 * Created by Mihail on 10/2/2016.
 */
'use strict';

import assert from 'assert';
import { Utils } from '../../src/utils/utils';
import { expect } from 'chai';
//import jsdom  from 'mocha-jsdom';

describe('Utils service', () => {

	//jsdom();

	it ('Should provide a method for eliminating duplicates in array', (done) => {
		const arr = [1,2,3,4,5,5];
		const arrRes = Utils.eliminateDuplicates(arr);
		expect(arrRes.length).to.be.equal(5);
		done();
	});

	it ('Should provide a method for defining the ball css class', (done) => {
		const num = 15;
		const resColor = Utils.getCssClassByNumber(num);
		expect(resColor).to.be.equal('ballB');
		done();
	});

	/*it ('Should provide a method for showing/hiding a given element', (done) => {
		const el = document.createElement('div');
		el.setAttribute('id', 'test');
		document.body.appendChild(el);
		Utils.toggleVisibility(el, false);
		expect(el.style.display).to.be.equal('none');
		done();
	});*/
});