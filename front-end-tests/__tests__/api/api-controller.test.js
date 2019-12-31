import ApiController from '../../../src/api/api-controller';

describe('Api Controller', () => {
	function storageMock() {
		const storage = {};

		return {
			setItem: function(key, value) {
				storage[key] = value || '';
			},
			getItem: function(key) {
				return storage[key] || null;
			},
			removeItem: function(key) {
				delete storage[key];
			},
			get length() {
				return Object.keys(storage).length;
			},
			key: function(i) {
				const keys = Object.keys(storage);
				return keys[i] || null;
			}
		};
	}

	test('Should initialize View Ctrl to interact with the views', () => {
		const window = document.defaultView;
		window.localStorage = storageMock();

		const apiCtrl = new ApiController();
		expect(apiCtrl.viewCtrl).not.toBe(undefined);
	});
});
