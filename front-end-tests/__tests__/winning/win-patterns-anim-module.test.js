/**
 * Created by Mihail on 11/24/2016.
 */
'use strict';

import WinPatternsAnimModule from '../../../src/winning/win-patterns-anim-module';
import { expect } from 'chai';

describe('WinPatternsAnimModule module', () => {
	test('Should get element container, rows, cols and patterns', () => {
		const container = document.createElement('section');
		let wpam = new WinPatternsAnimModule(container, 5, 5, 'horizontal');
		expect(wpam.elem).not.to.be.undefined;
		expect(wpam.rows).not.to.be.undefined;
		expect(wpam.cols).not.to.be.undefined;
		expect(wpam.pattern).not.to.be.undefined;
	});

	test(
        'Should call createDomElement to create the DOM structure of the module',
        () => {
            const container = document.createElement('section');
            const wpam = new WinPatternsAnimModule(container, 5, 5, 'horizontal');
            expect(wpam.createDomElement).to.be.calledOnce;
        }
    );

	test(
        'Should call startAnimation method to animate the winning patterns',
        () => {
            const container = document.createElement('section');
            const wpam = new WinPatternsAnimModule(container, 5, 5, 'horizontal');
            expect(wpam.startAnimation).to.be.calledOnce;
        }
    );

	test('Should be able to clear the animation module table', () => {
		const container = document.createElement('section');
		const wpam = new WinPatternsAnimModule(container, 5, 5, 'horizontal');
		expect(wpam.clearTable).not.to.be.undefined;
	});

	test('Should have method for animating horizontal pattern', () => {
		const container = document.createElement('section');
		const wpam = new WinPatternsAnimModule(container, 5, 5, 'horizontal');
		expect(wpam.startHorizontalAnim).not.to.be.undefined;
	});

	test('Should have method for animating vertical pattern', () => {
		const container = document.createElement('section');
		const wpam = new WinPatternsAnimModule(container, 5, 5, 'vertical');
		expect(wpam.startVerticalAnim).not.to.be.undefined;
	});

	test('Should have method for animating diagonal pattern', () => {
		const container = document.createElement('section');
		const wpam = new WinPatternsAnimModule(container, 5, 5, 'diagonal');
		expect(wpam.startDiagonallAnim).not.to.be.undefined;
	});
});