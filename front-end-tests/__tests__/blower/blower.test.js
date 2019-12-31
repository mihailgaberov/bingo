import Blower from '../../../src/blower/blower';

describe('Blower module', () => {
  test('Should create a blower component', (done) => {
    let el = document.createElement('canvas');
    const blower = new Blower(el);
    expect(blower).not.toBe(undefined);
    done();
  });

  test('Should init with stopped animation', (done) => {
    let el = document.createElement('canvas');
    let blower = new Blower(el);
    expect(blower.init).toEqual(expect.objectContaining({ play: false, isPlaying: false }));
    done();
  });

  test('Should create an array with 75 ball objects', (done) => {
    let el = document.createElement('canvas');
    let blower = new Blower(el);
    expect(blower.balls.length).toEqual(75);
    done();
  });

  test('Should have mechanism for starting the animation', (done) => {
    let el = document.createElement('canvas');
    let blower = new Blower(el);
    expect(typeof blower.startAnimation).toBe('function');
    done();
  });

  test('Should have mechanism for stopping the animation', (done) => {
    let el = document.createElement('canvas');
    let blower = new Blower(el);
    expect(typeof blower.stopAnimation).toBe('function');
    done();
  });
});
