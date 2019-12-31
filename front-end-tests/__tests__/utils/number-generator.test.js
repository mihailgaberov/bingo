import { NumbersGenerator } from '../../../src/utils/numbers-generator';

describe('Numbers generation util', () => {

  test('Should produce random number between min and max values', () => {
    let min = 1, max = 5, res1 = 0, res2 = 0;
    while (res1 === res2) {
      res1 = NumbersGenerator.getRandomNumber(min, max);
      res2 = NumbersGenerator.getRandomNumber(min, max);
    }

    expect(res1).not.toEqual(res2);
  });

  test(
    'Should produce 5 different random numbers out of array of 15 numbers',
    () => {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

      const arrRes = NumbersGenerator.getColumnNumbers(arr);

      expect(arrRes.length).toEqual(5);
      expect(arrRes[0]).not.toEqual(arrRes[1]);
      expect(arrRes[1]).not.toEqual(arrRes[2]);
      expect(arrRes[2]).not.toEqual(arrRes[3]);
      expect(arrRes[3]).not.toEqual(arrRes[4]);

    }
  );

  test(
    'Should do random generation the first column, 5 numbers in range: B is 1-15',
    () => {
      const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

      const arrRes = NumbersGenerator.getColumnNumbers(arr, 5);

      expect(arrRes.length).toEqual(5);

      for (let i = 0; i < arrRes.length; i++) {
        expect(arrRes[i]).not.toBeLessThan(1);
        expect(arrRes[i]).not.toBeGreaterThan(15);
      }
    }
  );

  test(
    'Should do random generation the second column, 5 numbers in range: I is 16-30',
    () => {
      const arr = [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];

      const arrRes = NumbersGenerator.getColumnNumbers(arr, 5);

      expect(arrRes.length).toEqual(5);

      for (let i = 0; i < arrRes.length; i++) {
        expect(arrRes[i]).not.toBeLessThan(16);
        expect(arrRes[i]).not.toBeGreaterThan(30);
      }
    }
  );

  test(
    'Should do random generation the third column, 5 numbers in range: N is 31-45',
    () => {
      const arr = [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

      const arrRes = NumbersGenerator.getColumnNumbers(arr, 5);

      expect(arrRes.length).toEqual(5);

      for (let i = 0; i < arrRes.length; i++) {
        expect(arrRes[i]).not.toBeLessThan(31);
        expect(arrRes[i]).not.toBeGreaterThan(45);
      }
    }
  );

  test(
    'Should do random generation the fourth column, 5 numbers in range: G is 46-60',
    () => {
      const arr = [46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60];

      const arrRes = NumbersGenerator.getColumnNumbers(arr, 5);

      expect(arrRes.length).toEqual(5);

      for (let i = 0; i < arrRes.length; i++) {
        expect(arrRes[i]).not.toBeLessThan(46);
        expect(arrRes[i]).not.toBeGreaterThan(60);
      }
    }
  );

  test(
    'Should do random generation the fifth column, 5 numbers in range: O is 61-75',
    () => {
      const arr = [61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75];

      const arrRes = NumbersGenerator.getColumnNumbers(arr, 5);

      expect(arrRes.length).toEqual(5);

      for (let i = 0; i < arrRes.length; i++) {
        expect(arrRes[i]).not.toBeLessThan(61);
        expect(arrRes[i]).not.toBeGreaterThan(75);
      }
    }
  );
});
