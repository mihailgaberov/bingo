import { Utils } from '../../../src/utils/utils';

describe('Utils service', () => {
	test('Should provide a method for eliminating duplicates in array', (done) => {
		const arr = [1,2,3,4,5,5];
		const arrRes = Utils.eliminateDuplicates(arr);
		expect(arrRes.length).toEqual(5);
		done();
	});

	test('Should provide a method for defining the ball css class', (done) => {
		const num = 15;
		const resColor = Utils.getCssClassByNumber(num);
		expect(resColor).toEqual('ballB');
		done();
	});

	test(
        'Should provide a method for counting a given element in array',
        (done) => {
            const arr = [1, 2, 3, 1];
            const len = Utils.countInArray(arr, 1);
            expect(len).toEqual(2);
            done();
        }
    );
});
