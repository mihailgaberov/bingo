/**
 * Created by Mihail on 8/15/2016.
 */
'use strict';
import { EventsConsts } from '../../src/events/events-consts';
import { expect, assert } from 'chai';

describe('Bingo Events Constants', () => {

	it('Should contain LOGOUT constant', () => {
		expect(EventsConsts.LOGOUT).to.be.equal('logout');
	});
});