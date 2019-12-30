import Blower from '../../../src/blower/blower';

describe('Blower module', () => {
	test('Should create a blower component', async (done) => {
		let el = document.createElement('canvas');
		const blower = new Blower(el);
		expect(blower).not.toBe(undefined);
		done();
	});

	test('Should init with stopped animation', async (done) => {
		let el = document.createElement('canvas');
		let blower = new Blower(el);
		expect(blower.init).toBe(object);
		expect(blower.init).to.have.property('play').that.is.falsy;
		expect(blower.init).to.have.property('isPlaying').that.is.falsy;
		done();
	});

	test('Should create an array with 75 ball objects', (done) => {
		let el = document.createElement('canvas');
		let blower = new Blower(el);
		expect(blower.balls).to.be.an('array');
		expect(blower.balls.length).to.be.eql(75);
		done();
	});

	test('Should have mechanism for starting the animation', (done) => {
		let el = document.createElement('canvas');
		let blower = new Blower(el);
		expect(blower.startAnimation).to.be.function;
		done();
	});

	test('Should have mechanism for stopping the animation', (done) => {
		let el = document.createElement('canvas');
		let blower = new Blower(el);
		expect(blower.stopAnimation).to.be.function;
		done();
	});
});
