/**
 * Created by Mihail on 10/23/2016.
 */

'use strict';

import assert from 'assert';
import ViewManipulator from '../../src/utils/view-manipulator';
import { expect } from 'chai';
import jsdom  from 'mocha-jsdom';

describe('ViewManipulator module', () => {

	jsdom();

	it('Should provide a method for showing/hiding a given element', (done) => {
	 const el = document.createElement('div');
	 el.setAttribute('id', 'dauber');
	 document.body.appendChild(el);
	 ViewManipulator.toggleVisibility(el, false);
	 expect(el.style.display).to.be.equal('none');
	 done();
	 });
});