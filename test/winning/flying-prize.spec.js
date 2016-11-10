/**
 * Created by Mihail on 11/10/2016.
 */
/**
 * Created by Mihail on 11/2/2016.
 */
'use strict';

import assert from 'assert';
import FlyingPrize from '../../src/winning/flying-prize';
import { expect } from 'chai';
import jsdom  from 'mocha-jsdom';

describe('FlyingPrize module', () => {

	jsdom();

	it('Should contain the prize sum to animate flying', () => {
		const fp = new FlyingPrize(123);
		expect(fp.sum).to.be.equal(123);
	});
});