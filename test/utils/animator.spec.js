/**
 * Created by Mihail on 10/29/2016.
 */

'use strict';

import Animator from '../../src/utils/animator';
import assert from 'assert';
import { expect } from 'chai';

describe('Animator module', () => {

	it('Should provide common methods used in animations - bounce(), quad()', () => {
		expect(Animator.bounce).not.to.be.undefined;
		expect(Animator.quad).not.to.be.undefined;
	});
});
