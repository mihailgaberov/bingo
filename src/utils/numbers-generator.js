/**
 * Created by Mihail on 9/8/2016.
 */
"use strict";

const NumbersGenerator = {
	getRandomNumber (min, max) {
		if (max === undefined) {
			max = min;
			min = 0;
		}
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},


	/**
	 * Do random generation of the numbers by columns:
	 * On a real Bingo card, each column has a different
	 * range of numbers: B is 1–15, I is 16–30, N is 31–45,
	 * G is 46–60, and O is 61–75
	 * @returns {Array}
	 */
	getColumnNumbers(arrNumbers, countNums = 5) {
		let objAdded = {}, arrOutput = [], i, l;

		for(i = 0, l = arrNumbers.length; i < l; ++i) {
			let randomNum = this.getRandomNumber(arrNumbers[1] , arrNumbers[14]);

			if(objAdded.hasOwnProperty(randomNum) || arrOutput.length === countNums) {
				continue;
			}

			arrOutput.push(randomNum);
			objAdded[randomNum] = 1;
		}

		return arrOutput;
	}

};

export { NumbersGenerator };
