/**
 * Created by Mihail on 10/23/2016.
 */
'use strict';

import Bangup from '../../../src/utils/bangup';
import { expect } from 'chai';

describe('Bangup module', () => {
	test(
        'Should have the necessary params - container, start sum, end sum and duration',
        () => {
            const window = document.defaultView;
            window.requestAnimationFrame = ()=> {};
            const elContainer = document.createElement('div');
            const bangup = new Bangup(elContainer, 0, 100, 3);
            expect(bangup.container).not.to.be.undefined;
            expect(bangup.startTime).not.to.be.undefined;
            expect(bangup.fromSum).not.to.be.undefined;
            expect(bangup.toSum).not.to.be.undefined;
            expect(bangup.duration).not.to.be.undefined;
        }
    );

	test('Should reach the end sum after the duration has expired', () => {
		const window = document.defaultView;
		window.requestAnimationFrame = ()=> {};
		const duration = 3;
		const elContainer = document.createElement('div');
    new Bangup(elContainer, 0, 100, duration);
    setTimeout(() => {
			expect(elContainer.innerHTML).to.be.equal('100');
		}, duration * 1000);
	});
});
