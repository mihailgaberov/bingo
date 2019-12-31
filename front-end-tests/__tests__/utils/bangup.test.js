import Bangup from '../../../src/utils/bangup';

describe('Bangup module', () => {
	test(
        'Should have the necessary params - container, start sum, end sum and duration',
        () => {
            const window = document.defaultView;
            window.requestAnimationFrame = ()=> {};
            const elContainer = document.createElement('div');
            const bangup = new Bangup(elContainer, 0, 100, 3);
            expect(bangup.container).toBeDefined();
            expect(bangup.startTime).toBeDefined();
            expect(bangup.fromSum).toBeDefined();
            expect(bangup.toSum).toBeDefined();
            expect(bangup.duration).toBeDefined();
        }
    );

	test('Should reach the end sum after the duration has expired', () => {
		const window = document.defaultView;
		window.requestAnimationFrame = ()=> {};
		const duration = 3;
		const elContainer = document.createElement('div');
    new Bangup(elContainer, 0, 100, duration);
    setTimeout(() => {
			expect(elContainer.innerHTML).toEqual('100');
		}, duration * 1000);
	});
});
