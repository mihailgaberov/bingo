import { Utils } from '../../../src/utils/utils';
import Dauber from '../../../src/dauber/dauber';

jest.useFakeTimers();

describe('Dauber module', () => {
  let conf = {
    "gameConf": {
      "id": "1",
      "name": "American Bingo",
      "numbers": [
        1, 2, 3, 4, 5,
        6, 7, 8, 9, 10,
        11, 12, 13, 14, 15,
        16, 17, 18, 19, 20,
        21, 22, 23, 24, 25,
        26, 27, 28, 29, 30,
        31, 32, 33, 34, 35,
        36, 37, 38, 39, 40,
        41, 42, 43, 44, 45,
        46, 47, 48, 49, 50,
        51, 52, 53, 54, 55,
        56, 57, 58, 59, 60,
        61, 62, 63, 64, 65,
        66, 67, 68, 69, 70,
        71, 72, 73, 74, 75
      ]
    }
  };

  test('Should create a dauber module', (done) => {
    const selector = document.createElement('section');
    const dauber = new Dauber(conf, selector);
    expect(dauber).toBeTruthy();
    done();
  });

  test('Should be able to start the drawing of numbers/balls', (done) => {
    const selector = document.createElement('section');
    const dauber = new Dauber(conf, selector);
    expect(dauber.startDrawing).toBeTruthy();
    done();
  });

  test('Should be able to stop the drawing of numbers/balls', (done) => {
    const selector = document.createElement('section');
    const dauber = new Dauber(conf, selector);
    expect(dauber.endGame).toBeTruthy();
    done();
  });

  test('Should produce each number from the range only once', (done) => {
    const selector = document.createElement('section');
    const dauber = new Dauber(conf, selector);
    expect(dauber.drawNewNumber).toBeTruthy();
    let arrDrawnNumbers = [];

    for (let i = 0, l = conf.gameConf.numbers.length; i < l; ++i) {
      let num = dauber.drawNewNumber();
      if (num !== undefined)
        arrDrawnNumbers.push(num);
    }

    const arrRes = Utils.eliminateDuplicates(arrDrawnNumbers);
    expect(arrDrawnNumbers.length).toEqual(arrRes.length);
    done();
  });

  test('Should be able to start drawing a new ball on each given time interval', () => {
      const elChild = document.createElement('div');
      document.body.appendChild(elChild);
      const dauber = new Dauber(conf, elChild);
      const intervalInMs = 2000;
      dauber.startDrawing(intervalInMs);
      setTimeout(() => {
        dauber.endGame();
      }, 6000);
      expect(setTimeout).toHaveBeenCalledTimes(1);
    }
  );

  test(
    'Should be able to moveVerticalHorizontal the balls when 5 are visible and hide the first one',
    (done) => {
      const selector = document.createElement('div');
      document.body.appendChild(selector);

      const dauber = new Dauber(conf, selector);
      expect(dauber.arrVisibleBalls).toBeTruthy();

      const divEl = document.createElement('div');
      dauber.arrVisibleBalls = [
        { elBall: divEl },
        { elBall: divEl },
        { elBall: divEl },
        { elBall: divEl },
        { elBall: divEl }
      ];
      dauber.animateVisibleBalls();
      expect(dauber.arrVisibleBalls.length).toEqual(4);
      expect(dauber.arrVisibleBalls[0].elBall.style.display).toEqual('none');
      done();
    }
  );
});
