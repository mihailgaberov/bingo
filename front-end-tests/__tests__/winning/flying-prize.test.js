import FlyingPrize from '../../../src/winning/flying-prize';
import Animator from '../../../src/utils/animator'

describe('FlyingPrize module', () => {
	test('Should contain the prize sum to animate flying', () => {
		const fp = new FlyingPrize(123);
		expect(fp.sum).toEqual(123);
	});

	test('Should contain a method for animating the prize', () => {
		expect(FlyingPrize.animatePrizeFlying).toBeDefined();
	});

	test('Should use Animator method moveDiagonally', () => {
		Animator.moveDiagonally = jest.fn();
		FlyingPrize.animatePrizeFlying(123);
		expect(Animator.moveDiagonally).toHaveBeenCalled();
	});
});
