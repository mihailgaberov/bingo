import WinningDialog from '../../../src/winning/winning-dialog';

describe('WinningDialog module', () => {
	test('Should get the ID of a DOM element to contain the modal', () => {
		const wd = new WinningDialog('#id');
		expect(wd.elementID).toEqual('#id');
	});

	test('Should attach the necessary listeners', () => {
		const spy = spyOn(WinningDialog, 'attachListeners');
		new WinningDialog('#id');
		expect(spy).toHaveBeenCalled();
	});

	test(
        'Should assign the appropriate css class depending on how many bingos are won',
        () => {
            let className = WinningDialog.getHeaderImgClass(1);
            expect(className).toEqual('winner-one-bingo');
            className = WinningDialog.getHeaderImgClass(0);
            expect(className).toEqual('no-bingo');
        }
    );
});
