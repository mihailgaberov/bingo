import Ball from '../../../src/dauber/ball';
import PubSub from '../../../src/events/pubsub-service';

jest.useFakeTimers();

describe('Ball module', () => {

  test('Should create a ball object', (done) => {
    const pb = new PubSub();
    const ball = new Ball(34, pb, 'original');
    expect(ball).toBeTruthy();
    done();
  });

  test('Should create a ball object with given number', (done) => {
    const pb = new PubSub();
    const ball = new Ball(34, pb, 'original');
    expect(ball.elNumber.innerText).toBeTruthy();
    expect(ball.elNumber.innerText).toEqual(34);
    done();
  });

  test('Should create a ball object with given css class', (done) => {
    const pb = new PubSub();
    const ball = new Ball(34, pb, { name: 'original' });
    expect(ball.elBall.className).toEqual('original_ballN');
    done();
  });

  test('Should be able to draw itself', () => {
    const pb = new PubSub();
    const ball = new Ball(34, pb, 'original');
    expect(ball.draw).toBeTruthy();
    const el = document.createElement('div');
    el.setAttribute('id', '#tube');
		ball.draw(el, 4, true);
		expect(setTimeout).toHaveBeenCalledTimes(1);
	});

  test('Should have methods moveVerticalHorizontal and animate', (done) => {
    const pb = new PubSub();
    const ball = new Ball(34, pb, 'original');
    expect(ball.move).toBeTruthy();
    expect(ball.animate).toBeTruthy();
    done();
  });
});
