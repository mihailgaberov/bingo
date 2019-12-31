import Animator from '../../../src/utils/animator';

describe('Animator module', () => {
	test('Should provide linear method used in animations', () => {
		expect(Animator.linear).toBeDefined();
	});

	test('Should provide quadratic method used in animations', () => {
		expect(Animator.quad).toBeDefined();
	});

	test('Should provide bounce method used in animations', () => {
		expect(Animator.bounce).toBeDefined();
	});

	test('Should provide animate method used in animations', () => {
		expect(Animator.animate).toBeDefined();
	});

	test('Should provide moveVerticalHorizontal method used in animations', () => {
		expect(Animator.moveVerticalHorizontal).toBeDefined();
	});

	test(
        'Should animate moving an element from its current to a given coordinates',
        (done) => {
            const el = document.createElement('div');
            el.style.top = '5px';
            el.style.left = '5px';

            Animator.animate = jest.fn();

            Animator.moveVerticalHorizontal(el, 10, 10, Animator.linear, 200, 'px');

            setTimeout(() => {
                expect(el.style.top).toEqual('10px');
                expect(el.style.left).toEqual('10px');
            }, 500);

            expect(Animator.animate).toHaveBeenCalledTimes(2);
            done();
        }
    );

	test('Should animate rotating of a given element', () => {
		const el = document.createElement('div');
		el.style.transform = 0;

		Animator.rotateElement(el, 30, Animator.linear, 300);
		setTimeout(() => {
			expect(el.style.transform).toEqual('rotate(30deg)');
		}, 500);
	});

	test(
        'Should have method for triggering an event after given duration expires',
        () => {
            let catched = false;
            document.addEventListener('test', () => {
                catched = true;
            });

            Animator.dispatchEventAfterDuration('test', 1100);

            setTimeout(() => {
                expect(catched).toBeTruthy();
            }, 1100);
        }
    );
});
